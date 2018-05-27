const Article   = require('../../models/article');
const User    = require('../../models/user');
const ejs = require('ejs');
const path           = require('path');

let controller = {};

controller.getArticles = (req, res) => {
    Article.find({}, (error, article) => {
        if(error){
            res.status(200).json({
                status: "Error",
                message: error
            });
        }else{
        res.json(article);
        }
      });
}



module.exports = controller;