const express = require('express');
const UserController = require('./controllers/user');
const InvoiceController = require('./controllers/invoice');
const authentication = require('./middlewares/authentication');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login/admin', UserController.login);
router.use(authentication);
router.get('/get-invoice', InvoiceController.getAllInvoice);
router.post('/save-invoice', InvoiceController.createInvoice);

module.exports = router;
