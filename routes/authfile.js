const express = require('express'),
      app = express.Router(),
      passport = require('passport'),
      User    = require('../models/user');

    // =====================================
    // HOME PAGE  ========
    // =====================================

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', (req, res) => {
            console.log('receiving')
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

        // process the mobile login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/auth/profile', // redirect to the secure profile section
        failureRedirect : '/auth/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the mobile signup form
    app.get('/signup', (req, res) => {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the mobile signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/admin/addamin', // redirect to the secure profile section
        failureRedirect : '/admin/addamin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

        //Admin can change roles for users via this route
    app.get('/role/:email/:role', (req, res) => {
        var role = req.params.role;
        var email = req.params.email;
          console.log(email);
        User.getUserByUsername(email, (err, user) => {
            if(err) return err;
            console.log(user);
              if(user){
                if(role == 'Admin'){
                  user.update({"role":role}, (err, user) => {
                    if(err) return(err)
                      res.redirect('/admin');
                  });
                }
              }else{
                res.send("user does not exist");
            }
        });
      
     })


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/auth/login');
}


module.exports = app;