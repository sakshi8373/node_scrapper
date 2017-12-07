var express = require('express');
var fs      = require('fs');
var request = require('request');
var bodyParser = require('body-parser');
var app     = express();
var cloudinary = require('cloudinary');
var multiparty = require('multiparty');
var path = require('path');
var mongoose = require('mongoose');
var Scraper = require ('images-scraper')
  , google = new Scraper.Google();
var searchModel = require('./assest/model/images.js');


cloudinary.config({ 
  cloud_name: 'ducixxxyx', 
  api_key: '971481123293634', 
  api_secret: '_nCwcLXMZ2o6t_4zdpgtYSseaBU' 
});

//================Moongo Db connection==================================//

mongoose.Promise = global.Promise;
const promise = mongoose.connect("mongodb://localhost/image_scraping", {
   useMongoClient: true   
}); 
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});


app.use(express.static(path.join(__dirname, 'assest')));

app.get('/', function (req, res) {
    console.log("Fffffffffffff")
    res.sendFile(__dirname + '/index.html');
});

//======================View api from images=====================================//

app.post('/scrape', function(req, res){
    console.log("scrape======>>",JSON.stringify(req.body))
       google.list({
                keyword: req.body.keyword,     //search keyword
                num: 2,                                    //no of images you want
                detail: true,
                nightmare: {
                    show: false
                }
        })
        .then(function (response) {
            console.log('first 15 results from google',JSON.stringify(response));
                        return res.json({responseCode:200,responseMessage:"Success",data:response})
        }).catch(function(err) {
            console.log('err==============+>>>>>>>>>>>>>>>>>>>>', err);
            return res.json({responseCode:404,responseMessage:"Success",data:err})
        });
})

var form = new multiparty.Form();

//=========================Upload images on cloudinary=========================//

app.post('/uploadimage',function(req, res){
    var images=req.body.images;
    var imageURL =[]
    var async = require('async');
    try {
       async.forEachOfLimit(images, 1, function (value, key, callback) {
        cloudinary.uploader.upload(value,function(result) { 
          console.log(result) 
          imageURL.push(result.url)
          if(result){
            callback()
          }
          
        },{effect: "grayscale"},{quality: 60});
       }, function (err,success) {
            if(err){
                res.json({responseCode:500,responseMessage:"Something went wrong"})
            }
            else{
                var data = {
                    keyword: req.body.keyword,
                    images: imageURL
                }
                var searchImg = new searchModel(data)
                searchImg.save(function(err, result){
                    res.json({responseCode:200,responseMessage:"Success",data:imageURL})
                })
            }
           
       });
    }
    catch (e) {
       console.log(e);
    }
})

//=========================Search all saved search===========================//
app.get('/searchlist',function(req, res){
    searchModel.find({},'keyword',function(err,result){
     if(err){
         res.json({responseCode:500,responseMessage:"Something went wrong"})
     }else if(result.length == 0){
         res.json({responseCode:404,responseMessage:"No data found"})
     }else{
        res.json({responseCode:200,responseMessage:"Success",data:result})
     }
    })
})

//========================View all saved images=================================//
app.post('/showImages',function(req, res){
    searchModel.findOne({_id:req.body.keywordId},function(err,result){
     if(err){
         res.json({responseCode:500,responseMessage:"Something went wrong"})
     }else if(!result){
         res.json({responseCode:404,responseMessage:"No data found"})
     }else{
        res.json({responseCode:200,responseMessage:"Success",data:result.images})
     }
    })
})

app.listen('8081')
console.log('Server is listen on port 8081');
exports = module.exports = app;