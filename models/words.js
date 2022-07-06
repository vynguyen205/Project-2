const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/connection');

class Word extends Model{}

Word.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    word: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, 
{
    sequelize,
    modelName: 'word',
    freezeTableName: true,
    timestamps: false,
});

module.exports = Word