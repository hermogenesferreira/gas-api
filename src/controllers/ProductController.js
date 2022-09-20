import Invoice from '../models/Invoice';
import Product from '../models/Product';
const { Op } = require('sequelize');

class ProductController {
  async index(req, res) {
    try {
      const invoices = await Product.findAll();
      return res.json(invoices);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async filter(req, res) {
    try {
      const { name } = req.params;
      const products = await Product.findAll({
        where: { name: { [Op.startsWith]: name } },
        include: Invoice,
        order: [['price', 'ASC']],
      });
      return res.json(products);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      res.json(product);
    } catch (err) {
      return res.json(500).json({ message: 'Internal server error.' });
    }
  }
}

export default new ProductController();
