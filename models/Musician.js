const {Sequelize, sequelize} = require('../db');

// TODO - define the Musician model
const Musician = sequelize.define('Musician', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    instrument: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

module.exports = {
    Musician
};