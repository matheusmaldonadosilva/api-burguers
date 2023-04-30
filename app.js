const express = require('express');
const app = express();
var cors = require('cors');

//create middleware receive of data in body of request
app.use(express.json()); //receive data at json
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); //allow access from the frontend
	app.use(cors());
	next();
});

//test database connection
const db = require('./db/models');

//include the controllers
const users = require('./controllers/users');
const burguers = require('./controllers/burguers');

app.use('/', users);
app.use('/', burguers);

app.listen(8080, () => {
	console.log('Serviço rodando na porta 8080!');
});
