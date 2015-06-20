var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Quiz' });
});

router.get('/author', function (req, res) {
    res.render('creditos', { author: 'Aurelio García' });
});

router.get('/quizes',  quizController.question);

router.get('/answer', quizController.answer);


module.exports = router;