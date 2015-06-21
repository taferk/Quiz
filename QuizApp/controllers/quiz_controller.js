var models = require('../models/models');

exports.load = function (req, res, next, quizId){
    models.Quiz.findById(req.params.quizId).then(function (quiz) {
        if (quiz) {
            req.quiz = quiz.dataValues;
            next();
        }
        else {
            next(new Error('no existe quizId= ' + quizId));
        }
    }).catch(function (error) { next(error); });
}


exports.index = function (req, res) {
    var search = (req.query.search || '').trim();
    if (search > '') {
        search = '%' + search.replace(' ', '%') + '%';
        models.Quiz.findAll({ where: ['pregunta like ?', search], order: 'pregunta' }).then(function (quizes) {
            res.render('quizes/index', { quizes : quizes });
        })
    } else {
        models.Quiz.findAll().then(function (quizes) {
            res.render('quizes/index', { quizes : quizes });
        })
    }
};

exports.show = function (req, res) {
    res.render('quizes/show', { quiz : req.quiz })
};

exports.answer = function (req, res) {
    res.render('quizes/answer', { quiz : req.quiz, respuesta: req.query.respuesta === req.quiz.respuesta?'Correcto':'Incorrecto' });
};