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
    db.Carts.findAll({}).then(function(carts) {
      res.json(carts);
    });
  });



  app.post("/api/carts", function(req, res) {
    // Add sequelize code for creating a post using req.body,
    db.Carts.create({
      sku: req.body.sku,
      product: req.body.product,
      price: req.body.price
      
    }).then(function(cart) {
      res.json({ id: cart.id });
    });
  });


  // DELETE route for deleting posts
  app.delete("/api/carts/:id", function(req, res) {
    // Add sequelize code to delete a post where the id is equal to req.params.id,
    db.Carts.destroy({ where: { id: req.params.id } })
      // then return the result to the user using res.json
      .then(function(cart) {
        res.json(cart);
      });
  });



  app.put("/api/carts", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Carts.update({
      quantity: req.body.quantity
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(cart) {
      res.json(cart);
    });

  });




};
