const express = require('express');
const contactRouter = express.Router();
const ContactController = require('../controllers/ContactController.js');

contactRouter.get('/', ContactController.showAll);
contactRouter.post('/', ContactController.add);
contactRouter.get('/:id', ContactController.find);
contactRouter.put('/:id', ContactController.update);
contactRouter.delete('/:id', ContactController.delete);

module.exports = contactRouter;