const { Sequelize } = require('sequelize');

const conn = require('../database');

const Invoice = conn.define('invoices', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cnpj: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  key: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

Invoice.sync();
module.exports = Invoice;
