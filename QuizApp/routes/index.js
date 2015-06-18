var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/author', function (req, res) {
    res.render('creditos', { author: 'Aurelio García' });
});

router.get('/quizes', function (req, res) {
    res.render('quizes/question', { pregunta: 'Aún sin implementar' });
});

router.get('/answer', function (req, res) {
    res.render('quizes/answer', { resultado: 'Aún sin implementar' });
});


module.exports = router;