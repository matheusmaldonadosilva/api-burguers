const express = require('express');
const app = express();

//create middleware receive of data in body of request
app.use(express.json()); //receive data at json

//test database connection
const db = require('./db/models');

//include the controllers
const users = require('./controllers/users');

app.use('/', users);

app.listen(8080, () => {
	console.log('Server running');
});
