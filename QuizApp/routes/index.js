﻿var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var comentarioController = require('../controllers/comentario_controller');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Quiz' });
});

router.get('/author', function (req, res) {
    res.render('creditos', { author: 'Aurelio García' });
});


router.param('quizId', quizController.load);

router.get('/quizes',  quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.delete);

router.get('/quizes/:quizId(\\d+)/comentarios/new', comentarioController.new);
router.post('/quizes/:quizId(\\d+)/comentarios/', comentarioController.create);


module.exports = router;