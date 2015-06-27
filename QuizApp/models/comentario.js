// Definición del modelo de Comentario

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Comentario',
    {
            texto: {
                type : DataTypes.STRING,
                validate : { notEmpty: { msg: '- Falta comentario' } }
            },
            publicar: {
                type : DataTypes.BOOLEAN,
                defaultValue : false 
            },
            quiz_id: {
                type : DataTypes.INTEGER
            }
        });
}