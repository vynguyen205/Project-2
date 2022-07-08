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
    socket_id: {
      type: DataTypes.STRING,
    },
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
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
