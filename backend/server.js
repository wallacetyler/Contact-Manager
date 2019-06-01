const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const contactRoutes = express.Router();
const PORT = 4000;

let Contact = require('./contact.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/contact_manager', {
    useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// API endpoint to retrieve contact
contactRoutes.route('/').get(function(req, res) {
    Contact.find(function(err, contacts) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(contacts);
        }
    });
});

contactRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Contact.findById(id, function(err, contact) {
        res.json(contact);
    });
});

contactRoutes.route('/update/:id').post(function(req, res) {
    Contact.findById(req.params.id, function(err, contact) {
        if (!contact)
            res.status(404).send("data is not found");
        else
            contact.contact_name = req.body.contact_name;
            contact.contact_email= req.body.contact_email;
            contact.contact_address = req.body.contact_address;
            contact.contact_phone = req.body.contact_phone;

            contact.save().then(contact => {
                res.json('Contact updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

contactRoutes.route('/add').post(function(req, res) {
    let contact = new Contact(req.body);
    contact.save()
        .then(contact => {
            res.status(200).json({'contact': 'contact added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new contact failed\n' + err);
        });
});

contactRoutes.route('/delete/:id').delete(function(req, res) {
    Contact.findByIdAndRemove({_id: req.params.id})
        .then(function(contact) {
            res.send(contact);
        });
});

app.use('/contacts', contactRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port:" + PORT);
})