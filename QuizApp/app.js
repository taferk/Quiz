﻿var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');
var os = require("os");

var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('quiz-2015'));
app.use(session({
    secret: 'emmmm-nose',
    resave: true,
    saveUninitialized: true
}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next){
    if (!req.path.match(/\/login|\/logout/)) {
        req.session.redir = req.path;
    }

    res.locals.session = req.session;
    next();
})

app.use(function (req, res, next) {
    if (!req.path.match(/\/login|\/logout/)) {
        if (req.session.user) {
            var currentDate = new Date().getTime();
            var lastAccess = req.session.user.lastAccess || currentDate;
            var expire = currentDate - (2 * 60 * 1000);
            if (lastAccess < expire) {
                var sessionController = require('./controllers/session_controller');
                sessionController.destroy(req, res, next);
                return;
            }
            req.session.user.lastAccess = currentDate;
        }
    }
    res.locals.session = req.session;
    next();
})

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
};

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;


if (app.get('env') === 'development') {
    console.log('Aplicación iniciada en la dirección: http://' + os.hostname() + ':' + process.env.port);
};
