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
                if (!Rooms.roomName) {
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