const { Sequelize } = require('sequelize');

const conn = require('../database');
const Invoice = require('./Invoice');

const Product = conn.define('products', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});
Product.Invoice = Invoice.hasMany(Product);
Product.belongsTo(Invoice);

Product.sync();
module.exports = Product;
