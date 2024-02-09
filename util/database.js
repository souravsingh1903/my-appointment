const Sequelize = require('sequelize');

const sequelize = new Sequelize('appointment', 'root', 'Sourav@1999#', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
