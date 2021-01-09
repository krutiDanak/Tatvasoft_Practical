var express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const port = 3000;
var index = require('./routes/index');
var user = require('./routes/user');
const database = require('./db')

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const { isAuthenticated } = require('./helpers/jwt');

const DATABASE_NAME = database.name
const DATABASE_PORT = database.port
const DATABASE_HOST = database.host

mongoose.connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`, {
    auto_reconnect: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
const { connection } = mongoose

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})

connection.once('open', () => {
    console.log('MongoDB connected')
})
app.use('/api', index);
app.use(isAuthenticated);
app.use('/api/user', user);

module.exports = app
