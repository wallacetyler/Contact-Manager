# Contact Manager

Description of our contact manage can go here.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Install MongoDB for Windows. Also be sure to install Node for Windows. Check that Node is working by opening PowerShell as admin and running the following commands `npm -v`. You should see a version number. 

### Installing

Be sure to clone this repository. 

Create a the directory `data\db` in your root directory.

```
react_app
├── backend                # API Files
├── public                 # Public Files
└── src                    # Frontend Files
```

Using your terminal access the main directory of the app. First you must create the database before anything. To do this on Windows 
run the following command:
```
"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"
``` 
Be sure to change [INSERT PROJECT PATH] to be the path on your machine to the cloned repository. If successful you should see:
```
[initandlisten] waiting for connections
``` 

Now we need to create the database. In a new Window/Tab run:
```
"C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"
```
then run:
```
use contact_manager
```
You should see the message `switched to db contact_manager`. 

Now let's install the the dependecies for each app using npm. First run `npm install -g nodemon` to install nodemon.

Then access the backend directory in a new Window/Tab and run: 
```
npm install
nodemon server.js
```
Now we will start both the backend then the frontend. In a new Window/Tab access the root folder and run: 
```
npm install
npm start
``` 

You can now access http://localhost:3000/ to see the homepage of the app. If everything is working correctly you should also be able to scroll down on the page and see both 'API is working properly' and 'Connected to database'.

## Running the tests

I don't think we will end up having tests unless we have a bunch of extra time.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Facebook create-react-app](https://github.com/facebook/create-react-app) - The React project framework used
* [Express](https://github.com/expressjs/express) - Web framework for Node
* [MongoDB](https://github.com/mongodb/mongo) - Used for database
* [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and Node.js

## Contributing

Please read [CONTRIBUTING.md](#) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

No versioning at this time.

## Authors

* **Tyler Wallace** - *Initial work* - [Tyler Wallace](https://github.com/tylerjwallace)
* **Anthony Pionessa** - *Front End* - https://codepen.io/sSasquatch/
* **Dariel Tenf** - *API*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
