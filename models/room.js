const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Room extends Model { }

Room.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    roomName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // numOfPlayers: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true
    // },

},
{
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'room',
    },
)

module.exports = Room;