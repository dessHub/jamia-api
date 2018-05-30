const express = require('express');
const app     = express.Router();

const controller = require('../controllers/api/index');

app.get('/articles/:category', (req, res) => {
    controller.getArticles(req, res);
})

app.get('/calendar', (req, res) => {
    controller.getCalendar(req, res);
})

module.exports = app;