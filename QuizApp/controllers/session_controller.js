exports.login = function (req, res, next){
    if (req.session.user)
        next()
    else
        res.redirect('/login');
}


exports.new = function (req, res) {
    res.render('sessions/new', { errors : req.session.errors || [] });
};

exports.create = function (req, res) {
    var login = req.body.login;
    var password = req.body.password;
    
    var userController = require('./usuario_controller');
    userController.autenticar(login, password, function (error, user){
        if (error) {
            req.session.errors = [{ message : error.toString() }];
            res.redirect('/login');
            return;
        }

        req.session.user = user;
        res.redirect(req.session.redir.toString());
    })
};

exports.destroy = function (req, res) {
    delete req.session.user;
    res.redirect('/');
};
