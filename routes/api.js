const express = require('express');
const app     = express.Router();

const controller = require('../controllers/api/index');

app.get('/articles/:category', (req, res) => {
    controller.getArticles(req, res);
})

app.get('/ads', (req, res) => {
    controller.getAds(req, res);
})

app.get('/calendar', (req, res) => {
    controller.getCalendar(req, res);
})

app.get('/Terms', (req, res) => {
    controller.getTerms(req, res);
})

module.exports = app;