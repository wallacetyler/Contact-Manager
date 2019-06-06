const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;
const PORT = 4000;
var ObjectId = require('mongodb').ObjectId;

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
	var idd = -1;
	var query = { user: request.body.user };
	
	userdb.find(query).toArray(function(err, result)
	{
		if(err)
			return response.json({status: "failure"});
		
		if(result.length != 0)
		{
			console.log("User already taken: " + request.body.user);
			return response.json({status: "failure"});
		}
		else
		{
			console.log("Registered user: " + request.body.user);
			var registerBody =
			{
				user: request.body.user,
				hash: request.body.hash
			};
			
			userdb.insertOne(registerBody, function(e, ins)
			{
				idd = ins.insertedId;
				return response.json({status: "success", id: idd});
			});
		}
	});
});

app.post('/contacts/list', function(request, response)
{
	var query = { userid: request.body.uid };
	
	contactdb.find(query).toArray(function(err, result)
	{
		console.log(result.length + " contacts found from id: " + request.body.uid);
		if(err)
			return response.json({status: "failure"});
		
		if(result.length > 0)
		{
			return response.json(result);
		}
		
		return response.json({status: "failure"});
	});
});

app.post('/contacts/add', function(request, response)
{
	var query = { id: request.body.uid };
	
	userdb.find(query).toArray(function(err, result)
	{
		if(result.length > 0)
		{
			contactdb.insertOne(request.body);
			console.log("Added contact named: " + request.body.name);
			return response.json({status: "success"});
		}
		
		return response.json({status: "failure"});
	});
});

app.post('/contacts/update', function(request, response)
{
	var query = { userid: request.body.uid, _id: ObjectId(request.body.cid) };
	
	contactdb.find(query).toArray(function(err, result)
	{
		console.log(query.userid + "|" + query._id);
		console.log(result.length);
		if(result.length >= 1)
		{
			var addContactBody =
			{
				name: request.body.name,
				email: request.body.email,
				address: request.body.address,
				phone: request.body.phone,
				userid: request.body.uid
			}
			
			contactdb.update(query, addContactBody)
			//return response.json({status: "success"});
		}
		//return response.json({status: "failure"});
	});
	
	return response.json({status: "failure"});
});

app.post('/contacts/find', function(request, response)
{
	
	console.log(request.body.cid);
	var query = { _id: ObjectId(request.body.cid) };
	
	var outcome = undefined;
	
	contactdb.find(query).toArray(function(err, result)
	{
		outcome = result;
	});
	
	if(outcome != undefined)
		return response.json(outcome);
	
	return response.json({status: "failure"});
});

app.post('/contacts/remove', function(request, response)
{
	var query = { _id: ObjectId(request.body.cid)};
	
	console.log("removing contact with id: " + request.body.cid);
	
	contactdb.remove(query);
	
	return response.json({status: "success"});
});