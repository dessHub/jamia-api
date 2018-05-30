const Article   = require('../../models/article');
const User    = require('../../models/user');
const calendar    = require('../../models/calendar');
const ejs = require('ejs');
const path           = require('path');

let controller = {};

controller.getArticles = (req, res) => {
    let category = req.params.category;
    Article.find({"category":category}, (error, articles) => {
        if(error){
            res.status(200).json({
                status: "Error",
                message: error
            });
        }else{
            let r = articles.reverse();
        res.json(r);
        }
      });
}

controller.getCalendar = (req, res) => {
    Calender.find({"status":"Active"}, (error, calendar) => {
        if(error){
            res.status(200).json({
                status: "Error",
                message: error
            });
        }else{
        res.json(calendar);            
        }
    } )
}



module.exports = controller;