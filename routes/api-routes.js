// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/products", function(req, res) {

    db.Product.findAll({}).then(function(products) {
      res.json(products);
    });
  });


  app.get("/api/products/category/:category", function(req, res) {
    
    db.Product.findAll({
      where: {
        category: req.params.category
      }

    }).then(function(products) {
      res.json(products);
    });
  });


  app.get("/api/products/:id", function(req, res) {

    db.Product.findOne({
      where: {
        id: req.params.id
      }
    })
      // return the result to the user with res.json
      .then(function(product) {
        res.json(product);
      });
  });




  app.get("/api/carts", function(req, res) {
    console.log("KKKKKK")
    db.Carts.findAll({}).then(function(carts) {
      res.json(carts);
    });
  });



};
