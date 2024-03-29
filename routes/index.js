const express = require('express');
const router = express.Router();
const data = require('../data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals = data;
  res.render('index', { title: 'Express' });
});

router.get('/about', (req, res, next)=>{
    res.render('aboust');
})

router.get('/project/:id', (req, res, next)=>{
    res.render('project', {project: data.projects[req.params.id]});
})

module.exports = router;
