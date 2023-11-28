const { Invoice } = require('../models');

class InvoiceController {
  static async getAllInvoice(req, res, next) {
    try {
      const invoices = await Invoice.findAll();
      res.status(200).json(invoices);
    } catch (err) {
      next(err);
    }
  }
  // static async getBannerById (req, res, next) {
  //     try {
  //         const banner = await Banner.findOne({where: {id: req.params.id}})
  //         if(!banner){
  //             throw {
  //                 name: 'bannerNotFound',
  //                 status: 404
  //             }
  //         } else {
  //             res.status(200).json(banner)
  //         }
  //     }
  //     catch(err){
  //         next(err)
  //     }
  // }
  static async createInvoice(req, res, next) {
    const payload = {
      invoiceNumber: req.body.invoiceNumber,
      name: req.body.name,
      description: req.body.description,
    };
    try {
      const newInvoice = await Invoice.create(payload);
      res.status(201).json(newInvoice);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async editInvoice(req, res, next) {
    const payload = {
      title: req.body.title,
      image_url: req.body.image_url,
      status: req.body.status,
    };
    try {
      const invoice = await Invoice.update(payload, {
        where: { id: req.params.id },
        returning: true,
      });
      res.status(200).json(invoice[1][0]);
    } catch (err) {
      next(err);
    }
  }
  static async deleteInvoice(req, res, next) {
    const id = req.params.id;
    try {
      const invoice = await Invoice.destroy({ where: { id } });
      res.status(200).json('delete banner has been success');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = InvoiceController;
