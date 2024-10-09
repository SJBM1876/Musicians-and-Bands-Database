const {Sequelize, sequelize} = require('../db');

// TODO - define the Song model
const Song = sequelize.define('Song', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    length: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

module.exports = {
    Song
};