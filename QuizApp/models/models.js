var path = require('path');
var crypto = require('crypto');
var Sequelize = require('sequelize');

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
var Comentario = sequelize.import(path.join(__dirname, 'comentario'));
var Usuario = sequelize.import(path.join(__dirname, 'usuario'));
Comentario.belongsTo(Quiz, {foreignKey: 'quiz_id'});
Quiz.hasMany(Comentario, {foreignKey: 'quiz_id'});

exports.Quiz = Quiz;
exports.Comentario = Comentario;
exports.Usuario = Usuario;

sequelize.sync().then(function () {
    Usuario.count().then(function (count) {
        if (count === 0) {
            var defaulPass = crypto.createHash('sha1').update('1234').digest('hex');
            Usuario.create({
                nombre: 'admin',
                clave: defaulPass,
                tipo: 0
            });
            Usuario.create({
                nombre: 'pepe',
                clave: defaulPass,
                tipo: 1
            })
           .then(function () { console.log('Tabla de usuarios incializada') });
        }
    });

    Quiz.count().then(function (count) {
        if (count === 0) {
            Quiz.create({
                pregunta: 'Capital de Francia',
                respuesta: 'París',
                tema: 'geografia'
            });
            Quiz.create({
                pregunta: 'Capital de Portugal',
                respuesta: 'Lisboa',
                tema: 'geografia'

            });
            Quiz.create({
                pregunta: '2 + 2',
                respuesta: '4',
                tema: 'matematicas'

            });
            Quiz.create({
                pregunta: 'Símbolo químico del oro',
                respuesta: 'Au',
                tema: 'ciencias'

            });
            Quiz.create({
                pregunta: 'Cuantos días tiene un año bisiesto',
                respuesta: '366',
                tema: 'otro'

            });
            Quiz.create({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma',
                tema: 'geografia'
            })
            .then(function () { console.log('Tabla de preguntas incializada') });
        };
    });
});