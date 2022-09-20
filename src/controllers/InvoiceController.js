import Invoice from '../models/invoice';
import ScrapGas from '../services/ScrapGas';
import Product from '../models/Product';
const { Op } = require('sequelize');

class InvoiceController {
  async index(req, res) {
    try {
      const invoices = await Invoice.findAll();
      return res.json(invoices);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async filter(req, res) {
    try {
      const { name } = req.params;
      const invoices = await Product.findAll({
        where: { name: { [Op.startsWith]: name } },
        include: Invoice,
        order: [['price', 'ASC']],
      });
      return res.json(invoices);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const invoice = await Invoice.findByPk(id, {
        include: Product,
        order: [[Product, 'price', 'ASC']],
      });
      res.json(invoice);
    } catch (err) {
      return res.json(500).json({ message: 'Internal server error.' });
    }
  }
  async create(req, res) {
    try {
      const { url } = req.body;
      const scraped = await ScrapGas(url);
      const { key } = scraped.invoice;
      const invoice = await Invoice.findOne({ where: { key: key } });
      if (invoice) {
        return res.status(422).json({ message: 'Invoice already exists!' });
      }
      await Invoice.create(scraped.invoice, { include: [Product] });
      console.log(scraped);
      //await Nfe.bulkCreate(fields);
      res.status(201).json({ message: `Invoice create sucess.`, scraped });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await Nfe.destroy({ where: { id: id } });
      return res.json({ message: `Nfe delete sucess.` });
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }
}

export default new InvoiceController();
