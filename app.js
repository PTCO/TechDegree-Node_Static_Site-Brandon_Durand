var express = require('express');
const path = require('path')

var indexRouter = require('./routes/index');

var app = express();

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);

app.use(function(req, res, next) {
  const err = new Error('Page not found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if(!err.status){
    err.message = 'Server Down'
    err.status = 500
    console.log(`${err.message} - Code: ${err.status}`)
    return res.render('error', {error: err});
  }
  
  console.log(`${err.message} - Code: ${err.status}`)
  res.render('page-not-found', {error: err});
});

app.listen(3000, ()=>{
  console.log('App started on port 3000')
});

module.exports = app;
