var express = require('express');
var router = express.Router();

// requiring models
var Service = require("../models/service");
var Product = require("../models/product");
var Package = require("../models/package");
const service = require('../models/service');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//services routes
// view all services => by dawood
router.get('/services', function(req, res, next){
  Service.find().sort('_id').exec(function(error, results) {
    if (error) {
        return next(error);
    }
    // displaying the result
    res.json(results);
  })
});
// view one service
router.get('/service/:id', function(req, res, next){
  Service.findById(req.params.id)
  .then((service) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(service);
  })
  .catch((err) => next(err))
});

// products routes
// view all products in one service => by fatima hanif
router.get('/:serviceID/products', function(req, res, next){
  Product.find({service: req.params.serviceID})
  .then((products) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(products);
  })
  .catch((err) => next(err))
})
//find one product
router.get('/products/:productID', function(req, res, next){
  Product.findOne({_id: req.params.productID}).populate('service')
  .exec(function(err, product){
    if (err){
      return next(err)
    }
    console.log(product.service.name);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(product);
  })
  // .then((product) => {
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'application/json');
  //   res.json(product);
  // })
  // .catch((err) => next(err))
})

// mahnoor part => packages
router.get("/packages", function (req, res, next) {
  Package.find().exec(function (error, results) {
    if (error) {
      return next(error);
    }
    res.json(results);
  });
});
router.get("/package/:id", function (req, res, next) {
  Package.findById(req.params.id)
    .then((package) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(package);
    })
    .catch((err) => next(err));
});

module.exports = router;
