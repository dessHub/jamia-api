const express = require('express');
const app = express.Router();
const controller = require('../controllers/admin/index');


app.get('/', isLoggedIn, isAdmin, (req, res) => {
    controller.index(req, res);
})

app.get('/articles', isLoggedIn,isAdmin, (req, res) => {
    controller.articles(req, res);
})

app.get('/article/create', isLoggedIn,isAdmin, (req, res) => {
    controller.getCreate(req, res);
})

app.post('/create', isLoggedIn,isAdmin, (req, res) => {
    controller.addArticle(req, res);
})

app.get('/article:id', isLoggedIn,isAdmin, (req, res) => {
    controller.getArticle(req, res);
})

app.get('/edit_article:id', isLoggedIn,isAdmin, (req, res) => {
    controller.getEdit(req, res);
})

app.post('/edit_article', isLoggedIn,isAdmin, (req, res) => {
    controller.postEdit(req, res);
})

app.get('/publish_article:id', isLoggedIn,isAdmin, (req, res) => {
    controller.publish(req, res);
})

app.get('/cancel_article:id', isLoggedIn,isAdmin, (req, res) => {
    controller.cancel(req, res);
})

app.get('/delete_article:id', isLoggedIn,isAdmin, (req, res) => {
    controller.remove(req, res);
})

app.get('/role:email/:role', isLoggedIn, isAdmin, (req, res) => {
    controller.changerole(req, res);
})

app.get('/user_remove:id', isLoggedIn, isAdmin, (req, res) => {
    controller.userremove(req, res);
})

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/auth/login');
}

function isAdmin(req, res, next) {
    var user = req.user;
    if (user.role=="Admin") {
      return next();
    }

    res.redirect('/');
  }


module.exports = app;
