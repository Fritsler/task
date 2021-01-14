const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
require('dotenv').config();
const routes = require('./routes');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json({ limit: '50mb' }));
app.use('/api/v1', routes);

http.createServer(app).listen(port, function () {
	console.log('Server started on port', port);
});