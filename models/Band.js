const {Sequelize, sequelize} = require('../db');

// TODO - define the Band model
const Band = sequelize.define('Band', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

module.exports = {
    Band
};