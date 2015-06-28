var models = require('../models/models');
var Sequelize = require('sequelize');

exports.show = function (req, res, next) {
    models.Quiz.findAll({
        attributes: ['tema',  
     [Sequelize.fn('count', Sequelize.col('id')), 'preguntas']], 
        group: ['"Quiz".tema']
    })
    .then(function (result) {
        models.Quiz.count().then(function (preguntas) {
            models.Comentario.count().then(function (comentarios) { 
                var datos = {};
                datos.qtemas = result;
                datos.preguntas = preguntas;
                datos.comentarios = comentarios
                res.render('quizes/estadisticas', { datos : datos });
            })
        })
    })
    .catch(function (error) {
        next(error);
    });
};