// Definición del modelo de Comentario

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Usuario',
    {
            nombre: {
                type : DataTypes.STRING,
                primaryKey: true,
                validate : { notEmpty: { msg: '- Falta el nombre del usuario' } }
            },
            clave: {
                type : DataTypes.STRING,
                validate : { notEmpty: { msg: '- Falta la clave del usuario' } }
            },
            tipo: {
                type : DataTypes.INTEGER,
                defaultValue : 1  // 0 - administrador, 1 - usuario pelufo
            },
            expiracion: {
                type : DataTypes.DATE,
                defaultValue: new Date(10000, 1, 1)
            }
        });
}