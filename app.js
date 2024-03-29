var express = require('express');
const path = require('path')

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Page not found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  if(!err.status){
    err.message = 'Server Down'
    err.status = 500
    return res.render('error', {error: err});
  }
  
  res.render('page-not-found', {error: err});
});

app.listen(3000, ()=>{
  console.log('App started on port 3000')
});

module.exports = app;
