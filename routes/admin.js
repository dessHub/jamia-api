const express = require('express');
const app = express.Router();
const controller = require('../controllers/admin/index');

const aws = require('aws-sdk')
/*
 * Configure the AWS region of the target bucket.
 * Remember to change this to the relevant region.
 */
aws.config.region = 'eu-west-1';

/*
 * Load the S3 information from the environment variables.
 */
const S3_BUCKET = process.env.S3_BUCKET;

app.get('/', (req, res) => {
    controller.index(req, res);
})

app.get('/articles',  (req, res) => {
    controller.articles(req, res);
})

app.get('/articles:category',  (req, res) => {
    controller.getArticles(req, res);
})

app.get('/addarticle', (req, res) => {
    controller.getCreate(req, res);
})

app.post('/create', (req, res) => {
    controller.addArticle(req, res);
})

app.get('/article:id', (req, res) => {
    controller.getArticle(req, res);
})

app.get('/edit_article:id',  (req, res) => {
    controller.getEdit(req, res);
})

app.post('/edit_article', (req, res) => {
    controller.postEdit(req, res);
})

app.get('/publish_article:id', (req, res) => {
    controller.publish(req, res);
})

app.get('/cancel_article:id', isLoggedIn,isAdmin, (req, res) => {
    controller.cancel(req, res);
})

app.get('/delete_article:id', (req, res) => {
    controller.remove(req, res);
})

app.get('/calendar',  (req, res) => {
    controller.calendar(req, res);
})

app.get('/addcalendar',  (req, res) => {
    controller.getCalendar(req, res);
})

app.post('/calendar', (req, res) => {
    controller.addCalendar(req, res);
})

app.get('/admins', (req, res) => {
    controller.getadmins(req, res);
})

app.get('/addadmin', (req, res) => {
    controller.addadmin(req, res);
})

app.post('/addadmin', (req, res) => {
    controller.postadmin(req, res);
})

app.get('/role:email/:role', (req, res) => {
    controller.changerole(req, res);
})

app.get('/removeadmin/:id', (req, res) => {
    controller.removeadmin(req, res);
})

app.get('/ads', (req, res) => {
    controller.getAds(req, res);
})

app.get('/createad', (req, res) => {
    controller.getcreatead(req, res);
})

app.post('/createad', (req, res) => {
    controller.addAd(req, res);
})

app.get('/edit_ad:id',  (req, res) => {
    controller.getEditAd(req, res);
})

app.post('/edit_ad', (req, res) => {
    controller.postEditAd(req, res);
})

app.get('/removead/:id', (req, res) => {
    controller.removead(req, res);
})

app.get('/terms', (req, res) => {
    controller.getterms(req, res);
})

app.get('/addterms', (req, res) => {
    controller.getcreateterm(req, res);
})

app.post('/addterms', (req, res) => {
    controller.addterm(req, res);
})

app.get('/edit_term:id',  (req, res) => {
    controller.getEditTerm(req, res);
})

app.post('/edit_term', (req, res) => {
    controller.postEditTerm(req, res);
})

app.get('/delete_term:id', (req, res) => {
    controller.removeterm(req, res);
})

app.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the login page
    res.redirect('/auth/login');
}

function isAdmin(req, res, next) {
    var user = req.user;
    if (user.role=="Admin") {
      return next();
    }

    res.redirect('/auth/login');
  }


module.exports = app;
