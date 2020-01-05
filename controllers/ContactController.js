const Model = require('../models');
const Contact = Model.Contact;

class ContactController {
  static showAll(req, res) {
    Contact.findAll({
      order: [
        ['id', 'ASC']
      ]
    })
      .then(data => {
        if(data) {
          res.status(200).json({
            data,
            status: 'success',
            message: 'get data success'
          });
        }
      })
      .catch(err => {
        res.status(500).json({ msg: err.message });
      })
  }

  static add(req, res) {
    Contact.create({
      name: req.body.name,
      phone: req.body.phone
    })
      .then(() => {
        res.status(201).json({ msg: 'Added new contact' });
      })
      .catch(err => {
        res.status(500).json({ msg: err.message });
      })
  }

  static find(req, res) {
    Contact.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if(data) {
          res.status(200).json({
            data,
            status: 'success',
            message: 'get data success'
          })
        } else {
          res.status(404).json({ msg: 'id not found '});
        }
      })
      .catch(err => {
        res.status(500).json({ msg: err.message });
      })
  }

  static update(req, res) {
    Contact.update({
      name: req.body.name,
      phone: req.body.phone
    }, {
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if(data[0] === 0) {
          res.status(404).json({
            data: [],
            status: 'not found',
            message: 'contact id not found'
          })
        } else {
          res.status(201).json({
            msg: `Contact with id ${req.params.id} has been updated`
          })
        }
      })
      .catch(err => {
        res.status(500).json({ msg: err.message });
      })
  }

  static delete(req, res) {
    Contact.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if(data) {
          data.destroy()
          res.status(201).json({
            message: `Contact with id ${req.params.id} has been successfully deleted`
          })
        } else {
          res.status(404).json({
            data: [],
            status: 'not found',
            message: `Contact with id ${req.params.id} not found`
          })
        }
      })
      .catch(err => {
        res.status(500).json({ msg: err.message });
      })
  }
}

module.exports = ContactController;