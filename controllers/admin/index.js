const Article   = require('../../models/article');
const User    = require('../../models/user');
const Calendar    = require('../../models/calendar');
const Ad    = require('../../models/ad');
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
     //let category = req.params.category;
    Article.find({}, (err, articles) => {
        if(err) throw err;
        let r = articles.reverse();
        console.log(articles)
        var c = [];
        for(let i=0; i<articles.length; i++){
            
            let ar = {}
            ar.id = articles[i].id;
            ar.title = articles[i].title;
            ar.content = articles[i].content.substring(0, 280);
            c.push(ar);
            
        }
        console.log(c)
        res.render('articles', {articles:c, category:"All Articles"});
    })

}

controller.getArticles = (req, res) => {
     let category = req.params.category;
    Article.find({"category":category}, (err, articles) => {
        if(err) throw err;
        let r = articles.reverse();

        res.render('articles', {articles:r, category:category});
    })

}

controller.getCreate = (req, res) => {

   res.render('addarticle');
}

controller.addArticle = (req, res) => {

    let article       =  new Article();
    article.title =  req.body.title;
    article.category =  req.body.category;
    article.banner =  req.body.avatar;
    article.content  =  req.body.content;
    article.status  =  req.body.status;
    console.log(req.body.content)
    article.save((err, article) => {
        if(err){
            res.json(err);
        } else {
            
        res.redirect("/admin/articles");
      }
    });
}

controller.getArticle = (req, res) => {
     let id = req.params.id;
    Article.findById(id, (err, article) => {
        if(err) throw err;
        
        res.render('article', {article:article});
    })

}

controller.getEdit = (req, res) => {
     let id = req.params.id;
    Article.findById(id, (err, article) => {
        if(err) throw err;
        
        res.render('e_article', {article:article});
    })

}

controller.postEdit = (req, res) => {
    let id = req.body.article_id;
    Article.findById(id, (err, article)=>{
        if(err) throw err;
        article.title =  req.body.title;
        article.content  =  req.body.content;
        article.banner = req.body.avatar
        article.status = article.status;
        article.save((err) => {
        if(err) throw err;
        let red_to = "/admin/article" + id ;
        res.redirect(red_to);     
         })
     })
}

controller.remove = (req, res) => {
    let id = req.params.id;
    console.log(id);
    Article.remove({_id: id}, (err) => {
        
        res.redirect('/admin/articles');
    })
}

controller.getadmins = (req, res) => {
    User.find({}, (err, users) => {
        if(err) throw err;
        
        res.render('admins', {users:users});
    })
}

controller.addadmin = (req, res) => {

   res.render('addadmin', { message: req.flash('signupMessage') });
}

controller.postadmin = (req, res) => {
    let email = req.body.email;

    User.findOne({"email":email}, (err, user)=>{
        // if there are any errors, return the error
        if (err)
           return done(err);
   
        // check to see if theres already a user with that email
        if (user) {
            res.render('addadmin.ejs', { message: req.flash('signupMessage', 'That email is already taken.') });
        } else {
            let newUser            = new User(); 
            newUser.name =  req.body.name;
            newUser.phone  =  req.body.phone;
            newUser.email  =  req.body.email;
            newUser.role = "Admin"
            newUser.password = newUser.generateHash(req.body.password);
            newUser.save((err) => {
            if(err) throw err;
            let red_to = "/admin/admins";
            res.redirect(red_to);     
            })
        }
    })
}

controller.removeadmin = (req, res) => {
    let id = req.params.id;
    console.log(id);
    User.remove({_id: id}, (err) => {
        
        res.redirect('/admin/admins');
    })
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
    calendar.title =  req.body.title;
    calendar.calendar =  req.body.avatar;
    calendar.status  =  req.body.status;
    calendar.save((err, calendar) => {
        if(err){
            res.json(err);
        } else {
            
        res.redirect("/admin/calendar");
      }
    });
}

controller.getAds = (req, res) => {
    Ad.find({}, (err, ads) => {
        if(err) throw err;
        let r = ads.reverse();

        res.render('ads', {ads:r});
    })

}

controller.getcreatead = (req, res) => {

   res.render('createad');
}

controller.addAd = (req, res) => {

    let ad       =  new Ad();
    ad.owner =  req.body.owner;
    ad.position =  "Unasign";
    ad.ad =  req.body.avatar;
    ad.content  =  req.body.content;
    ad.status  =  "Not Active";
    ad.save((err, ad) => {
        if(err){
            res.json(err);
        } else {
            
        res.redirect("/admin/ads");
      }
    });
}

controller.getEditAd = (req, res) => {
     let id = req.params.id;
    Ad.findById(id, (err, ad) => {
        if(err) throw err;
        
        res.render('ead', {ad:ad});
    })

}

controller.postEditAd = (req, res) => {
    let id = req.body.ad_id;
    Article.findById(id, (err, article)=>{
        if(err) throw err;
        ad.owner =  req.body.owner;
        ad.position =  "Unasign";
        ad.ad =  req.body.avatar;
        ad.content  =  req.body.content;
        ad.status  =  "Not Active";
        ad.save((err) => {
        if(err) throw err;
        let red_to = "/admin/ads" ;
        res.redirect(red_to);     
         })
     })
}

controller.removead = (req, res) => {
    let id = req.params.id;
    console.log(id);
    Ad.remove({_id: id}, (err) => {
        
        res.redirect('/admin/ads');
    })
}

module.exports = controller;

