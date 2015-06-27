var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var comentarioController = require('../controllers/comentario_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Quiz' });
});

router.get('/author', function (req, res) {
    res.render('creditos', { author: 'Aurelio García' });
});


router.param('quizId', quizController.load);

router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/quizes',  quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.login, quizController.new);
router.post('/quizes', sessionController.login, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.login, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.login, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.login, quizController.delete);

router.get('/quizes/:quizId(\\d+)/comentarios/new', sessionController.login, comentarioController.new);
router.post('/quizes/:quizId(\\d+)/comentarios/', sessionController.login, comentarioController.create);


module.exports = router;