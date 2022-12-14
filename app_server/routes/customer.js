var express = require("express");
var router = express.Router();

// requiring models
var Package = require("../models/package");
var Subscription = require("../models/subscription");
var Chat = require("../models/chat");

// packages by mahnoor

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

router.post("/subscribe", function (req, res, next) {
  Subscription.create(req.body)
    .then(
      (subscription) => {
        console.log("Subscription has been Added ", subscription);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(subscription);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.post("/subscribe/custom", function (req, res, next) {
  Package.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    custom: true,
  })
    .then(
      (package) => {
        console.log("Package has been Added ", package);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(package);
        return package._id;
      },
      (err) => next(err)
    )
    .then((id) => {
      Subscription.create({
        cid: req.body.cid,
        pid: req.body.pid,
        packageid: id,
      });
    });
});

router.get("/subscriptions/:id", function (req, res, next) {
  Subscription.find({ cid: req.params.id })
    .populate("cid")
    .populate("pid")
    .populate("packageid")
    .exec(function (err, subscription) {
      if (err) {
        return next(err);
      }
      console.log(subscription);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(subscription);
    });
});

// view chat by fatima anwar
router.get('/chat/:id', function(req, res, next){
  Chat.findById(req.params.id)
  .populate('cid')
  .populate('messages.mid')
  .then((customer) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(customer);
  })
  .catch((err) => next(err))
});


module.exports = router;
