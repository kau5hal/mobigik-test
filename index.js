const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan')

const app = express();
const server = http.createServer(app);
const path = require("path");
const fs = require('fs');

const indexRoute = require('./src/router/index')

app.use(cors())
app.use(bodyParser.json({limit:'50mb'}))
app.use(morgan('dev'))
app.use("/static", express.static(path.join(__dirname, "public")));
indexRoute(app)

var publicDir = './public';
if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir);
}
var publicImgDir = './public/img';
if (!fs.existsSync(publicImgDir)){
    fs.mkdirSync(publicImgDir);
}
var publicImgTempDir = './public/img/temp';
if (!fs.existsSync(publicImgTempDir)){
    fs.mkdirSync(publicImgTempDir);
}

server.listen(5000, () => {
    console.log("Server listening to port 5000")
})

