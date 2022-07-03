const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Round extends Model {}

Round.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    round: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    drawing_time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    portal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'rooms',
        key: 'id',
        unique: false
      }
    },
    word_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'words',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'round'
  }
);

module.exports = Round;