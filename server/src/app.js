const express = require('express');
const app = express();
const server = require('./server').modules;

server.setup(app).run();