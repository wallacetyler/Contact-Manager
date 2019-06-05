const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;
const PORT = 4000;

let Contact = require('./contact.model');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(4000, () => {
    MongoClient.connect('mongodb+srv://admin:admin@cluster0-0wwjj.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db('contactmanager');
        contactdb = database.collection("contacts");
        userdb = database.collection("users");
        console.log("Connected to both dbs!");
    });
});

// API endpoint to retrieve contact
app.get('/contacts', function(request, response) {
    contactdb.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post('/users/login', function(request, response)
{	
	var query = { user: request.body.user, hash: request.body.hash };
	
	userdb.find(query).toArray(function(err, result)
	{
		if(err)
			return response.json({status: "failure"});
		
		if(result.length == 1)
		{
			console.log("Successful login for user: " + request.body.user);
			return response.json({status: "success", id: result[0]._id });
		}
		else
		{
			console.log("Failed login for user: " + request.body.user);
			return response.json({status: "failure"});
		}
	});
});

app.post('/users/register', function(request, response)
{
	var query = { user: request.body.user };
	
	userdb.find(query).toArray(function(err, result)
	{
		if(err)
			return response.json({status: "failure"});
		
		if(result.length == 0)
		{
			console.log("Registered user: " + request.body.user);
			var registerBody =
			{
				user: request.body.user,
				hash: request.body.hash
			};
			userdb.insertOne(registerBody);
			return response.json({status: "success"});
		}
		
		console.log("User already taken: " + request.body.user);
		return response.json({status: "failure"});
	});
});

app.get('/id', function(req, res) {
    let id = req.params.id;
    Contact.findById(id, function(err, contact) {
        res.json(contact);
    });
});

app.post('/updateid', function(req, res) {
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

app.post('/add', function(req, res) {
	console.log('add contact');
    let contact = new Contact(req.body);
    contact.save()
        .then(contact => {
            res.status(200).json({'contact': 'contact added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new contact failed\n' + err);
        });
});

app.delete('/delete/:id', function(req, res) {
    Contact.findByIdAndRemove({_id: req.params.id})
        .then(function(contact) {
            res.send(contact);
        });
});