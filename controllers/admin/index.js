const Article   = require('../../models/article');
const User    = require('../../models/user');
const showdown  = require('showdown'),
    converter = new showdown.Converter();

let controller = {};


controller.index = (req, res) => {

    Article.count({"status":"Active"}, (err, active) => {
        if(err) throw err;

        Article.count({}, (err, past) => {
            if(err) throw err;

                User.count({}, (err, users) => {
                    if(err) throw err;
    
                    res.render('index', {active:active,users:users,articles:past}); 
                }) 
        })  
    })
    
}

controller.articles = (req, res) => {

    Article.find({}, (err, articles) => {
        if(err) throw err;
        
        res.render('articles', {articles:articles});
    })

}

controller.getCreate = (req, res) => {

   res.render('addarticle');
}

controller.addArticle = (req, res) => {

    let article       =  new Article();
    article.title =  req.body.title;
    article.category =  req.body.category;
    article.content  =  converter.makeHtml(req.body.content);
    article.status  =  req.body.status;
    console.log(req.body.content)
    article.save((err, article) => {
        if(err){
            res.json(err);
        } else {
            
        res.redirect("/admin/addarticle");
      }
    });
}

controller.calendar = (req, res) => {
   Calendar.find({}, (err, calendar) => {
       if(err) throw error;
       
       res.render('calendar', {calendar:calendar});
   })
  
}

controller.getCalendar = (req, res) => {

   res.render('addcalendar');
}

controller.addCalendar = (req, res) => {

    let calendar       =  new Calendar();
    calendar.year =  req.body.year;
    calendar.calendar =  req.body.calendar;
    article.status  =  req.body.status;
    calendar.save((err, calendar) => {
        if(err){
            res.json(err);
        } else {
            
        res.redirect("/admin/calendar");
      }
    });
}

module.exports = controller;

