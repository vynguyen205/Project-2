const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Room extends Model { }

Rooms.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    roomname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [2, 255]
        }
    }
},
    {
        hooks: {
            //if no username is provided, set it to be anonymous
            beforeCreate: async (user) => {
                if (!Rooms.roomname) {
                    user.username = 'anonymous';
                }
            },
        },
    },
{
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'room',
    },
)