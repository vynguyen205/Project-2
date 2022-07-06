const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // socket_id: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // not sure if we want the username to be unique or not
      // unique: true,
      validate: {
        len: [2, 255],
      },
    },
    highscore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    room_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'room',
        key: 'id',
        unique: false,
      },
      allowNull: true,
    },
  },
  // {
  //     hooks: {
  //         beforeCreate(user) {
  //             //setting the username to be socket_id if it's not set yet
  //             username = user.socket_id.split('_')[0];
  //         },
  //     }
  // },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
