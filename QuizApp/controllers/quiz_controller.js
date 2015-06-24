var models = require('../models/models');

exports.load = function (req, res, next, quizId){
    models.Quiz.findById(req.params.quizId).then(function (quiz) {
        if (quiz) {
            req.quiz = quiz;
            next();
        }
        else {
            next(new Error('no existe quizId= ' + quizId));
        }
    }).catch(function (error) { next(error); });
}


exports.index = function (req, res) {
    var search = (req.query.search || '').trim().toLowerCase();
    if (search > '') {
        search = '%' + search.replace(' ', '%') + '%';
        models.Quiz.findAll({ where: ['lower(pregunta) like ?', search], order: ['tema','pregunta'] }).then(function (quizes) {
            res.render('quizes/index', { quizes : quizes });
        }).catch(function (error) { next(error); });
    } else {
        models.Quiz.findAll({order: ['tema', 'pregunta'] }).then(function (quizes) {
            res.render('quizes/index', { quizes : quizes });
        }).catch(function (error) { next(error); });
    }
};

exports.show = function (req, res) {
    res.render('quizes/show', { quiz : req.quiz })
};

exports.answer = function (req, res) {
    res.render('quizes/answer', { quiz : req.quiz, respuesta: req.query.respuesta === req.quiz.respuesta?'Correcto':'Incorrecto' });
};

exports.new = function (req, res) {
    var quiz = models.Quiz.build({ pregunta: '', respuesta: '' });
    res.render('quizes/new', { quiz : quiz, errors: [] });
};

exports.create = function (req, res) {
    var quiz = models.Quiz.build(req.body.quiz);
    quiz.validate().then(function (err) {
        if (err) {
            res.render('quizes/new', { quiz: quiz, errors: err.errors })
        } else {
            quiz.save({ fields: ['pregunta', 'respuesta', 'tema'] })
            .then(function () {
                res.redirect('/quizes');
            }).catch(function (error) { next(error); });
        }
    });
};

exports.edit = function (req, res){
    res.render('quizes/edit', { quiz: req.quiz, errors: [] })
}

exports.update = function (req, res){
    var quiz = req.quiz;
    quiz.pregunta = req.body.quiz.pregunta;
    quiz.respuesta = req.body.quiz.respuesta;
    quiz.tema = req.body.quiz.tema;

    quiz.validate().then(function (err) {
        if (err) {
            res.render('quizes/edit', { quiz: quiz, errors: err.errors })
        } else {
            quiz.save({ fields: ['pregunta', 'respuesta', 'tema'] })
            .then(function () {
                res.redirect('/quizes');
            }).catch(function (error) { next(error); });
        }
    });
}

exports.delete = function (req, res) {
    req.quiz.destroy().then(function () {
        res.redirect('/quizes');
    }).catch(function (error) { next(error); });
}
