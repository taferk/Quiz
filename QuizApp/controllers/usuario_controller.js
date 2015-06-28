var models = require('../models/models');


exports.new = function (req, res) {
    var usuario = models.Usuario.build({ nombre:'', clave: '' });
    res.render('usuarios/new', { usuario : usuario, errors: [] });
};

exports.create = function (req, res, next) {
    models.Usuario.findById(req.body.usuario.nombre).then(function (usuario) {
        if (usuario) {
            res.render('usuarios/new', { usuario: { nombre: usuario.nombre }, errors: [{ message: 'El usuario ya existe' }] })
        } else {
            usuario = models.Usuario.build({
                nombre: req.body.usuario.nombre, 
                clave: req.body.usuario.clave
            });
            usuario.validate().then(function (err) {
                if (err) {
                    res.render('usuarios/new', { usuario: usuario, errors: err.errors })
                } else {
                    usuario.save({ fields: ['nombre', 'clave'] })
                    .then(function () {
                            req.session.user = usuario;
                            res.redirect('/quizes');
                    })
                }
            })
        }
    }).catch(function (error) { next(error); });;
};

exports.autenticar = function (nombre, clave, callback) {
    models.Usuario.findById(nombre).then(function (usuario) {
        if (usuario) {
            if (new Date().getMilliseconds() > usuario.expiracion.getMilliseconds()) {
                if (clave === usuario.clave) {
                    callback(null, usuario);
                }
                else {
                    callback(new Error('Clave incorrecta'));
                }
            }
            else {
                callback(new Error('Usuario expirado'));
            }
        } else {
            callback(new Error('No existe el usuario'));
        }
    })
};

