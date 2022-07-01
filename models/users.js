const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model{}

User.init ({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        // not sure if we want the username to be unique or not
        // unique: true,
        validate: {
            len: [2, 255]
        }
    },
    highscore: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    room_id: {
        type: DataTypes.INTEGER,
        references: { 
            model: 'room',
            key: 'id',
            unique: false
        }
    }

},
{
    hooks: {
        //if no username is provided, set it to be anonymous
        beforeCreate: async (user) => {
            if (!user.username) {
                user.username = 'anonymous';
            }
        }, 
        //if no highscore is provided, set it to be 0
        beforeUpdate: async (user) => {
            user.highscore = 0;
        },
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
},

);

module.exports = User;