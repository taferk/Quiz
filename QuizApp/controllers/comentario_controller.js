﻿var models = require('../models/models');

exports.new = function (req, res) {
    var comentario = models.Comentario.build({ quiz_id: req.params.quizId, texto: '', publicar: false });
    res.render('comentarios/new', { comentario : comentario, errors: [] });
};

exports.create = function (req, res, next) {
    var comentario = models.Comentario.build({ quiz_id: req.params.quizId, texto: req.body.comentario.texto });
    comentario.validate().then(function (err) {
        if (err) {
            res.render('comentarios/new', { comentario: comentario, errors: err.errors })
        } else {
            comentario.save({ fields: ['quiz_id', 'texto', 'publicar'] })
            .then(function () {
                res.redirect('/quizes/' + req.params.quizId);
            }).catch(function (error) { next(error); });
        }
    });
};

exports.publicar = function (req, res, next) {
    models.Comentario.findById(req.params.comentarioId).then(function (comentario) {
        if (comentario) {
            comentario.publicar = !comentario.publicar; 
            comentario.save({ fields: ['publicar'] })
            .then(function () {
                res.redirect('/quizes/' + req.params.quizId);
            }).catch(function (error) { next(error); });
        }
        else {
            next(new Error('No existe el comentario Id= ' + req.params.comentarioId));
        }
    }).catch(function (error) { next(error); });
};