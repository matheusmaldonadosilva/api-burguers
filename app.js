const express = require("express");
const app = express();
var bodyParser = require('body-parser');
var cors = require("cors");

//create middleware receive of data in body of request
app.use(express.json()); //receive data at json
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //allow access from the frontend
  app.use(cors());
  next();
});
function authentication(req, res, next) {
  const authToken = req.headers["authorization"];
  if(authToken != undefined) {
    const bearer = authToken.split(' ');
    var token = beader.pop();
    jwt.verify(token, '-%Mh!XD@Q!jiN#0s1W%#tA1Z', (err, data) => {
      if(err) {
        res.status(401);
        res.json({err: 'Token invalid'});
      } else {
        req.toke = token;
        req.loggedUser = {id: data.id, email: data.email};
        next();
      }
    });
  } else {
    res.status(401);
    res.json({ err: 'Token invalid'});
  }
}

//include the controllers
const users = require("./controllers/users");
const burguers = require("./controllers/burguers");
const auth = require("./controllers/auth");

app.use("/", users, authentication);
app.use("/", burguers, authentication);
app.use("/", auth, authentication);

//test database connection
const db = require("./db/models");

app.listen(8080, () => {
  console.log("Serviço rodando na porta 8080!");
});
