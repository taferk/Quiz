var path = require('path');
// Recabamos todos los datos de inicialización del tipo de BBDD
// de las variables de entorno (fichero '.env' en local), que en
// local tendrán un valor (SQLite) distinto de remoto (PostgreSQL)

var url = (process.env.DATABASE_URL || 'sqlite://:@:/').match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_NAME = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = protocol;
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE || 'quiz.sqlite';

var Sequelize = require('sequelize');

var sequelize = new Sequelize(DB_NAME, user, pwd, {
    protocol : protocol,
    dialect  : dialect,
    host     : host,
    logging: false,
    dialectOptions: {ssl: true},
    storage  : storage,     // Solo SQLite
    omitNull : true			// Solo PostgreSQL
});


var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;

sequelize.sync().then(function () {
    Quiz.count().then(function (count) {
        if (count === 0) {
            Quiz.create({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma'
            })
            .then(function () { console.log('Base de datos incializada') });
        };
    });
});