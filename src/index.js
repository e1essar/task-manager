const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");

var corsOptions = {
    origin: "http://localhost:8081"
  };

const app = express()

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("../models")
const Role = db.role

function initial() {
    Role.create({
        id:3,
        name: "collaborator"
    })

    Role.create({
        id:2,
        name: "manager"
    })

    Role.create({
        id:1,
        name: "admin"
    })
}

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});