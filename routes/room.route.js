const express = require('express');
const app = express();
const { createUrlFromBase } = require('../general/fonctions');
const roomController = require('../controllers/room.controller');

app.post(createUrlFromBase('/room/create'), roomController.createRoom);
app.post(createUrlFromBase('/room/join'), roomController.joinRoom);
app.post(createUrlFromBase('/get-room'), roomController.getRoom);
app.post(createUrlFromBase('/get-players'), roomController.getPlayers);

module.exports = app;