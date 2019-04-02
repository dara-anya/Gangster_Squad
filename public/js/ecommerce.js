
// Dcument Ready Function.
$(document).ready(function() {


  // Holding products display.
  var productsContainer = $(".products-container");

  // Holding cart display.
  var cartContainer = $("#cartContainer");

  var products;



//--------------------------------------------------------------
// ON CLICK/CHANGE           
//--------------------------------------------------------------
  // Adding to cart button.
  $(document).on("click", "button.addcart", addToCart);
  // Loading to cart.
  $(document).on("click", "button.addcart", getProducts);
  // Deleting cart item button.
  $(document).on("click", "button.delete", cartDelete);
  // Changing item quantity in cart.
  $(document).on('change', 'input', changeQuantity);



//--------------------------------------------------------------------
// BUILDING PRODUCTS DISPLAY -> Getting data from Products database         
//--------------------------------------------------------------------
  // This function gets the products from database
  function getProducts() {    
    $.get("/api/products", function(data) {
      products = data;
      initializeRows();
    });
  }
  getProducts();
  // Appending all products HTML inside container.
  function initializeRows() {
    productsContainer.empty();
    var productsToAdd = [];
    for (var i = 0; i < products.length; i++) {
      productsToAdd.push(createNewRow(products[i]));
    }
    productsContainer.append(productsToAdd);
  }
  // Constructing the HTML
  function createNewRow(product) {
    var newProductCard = $("<div>");
    newProductCard.addClass("card");
    newProductCard.css({
      float: "left",
      "height": "300",
      "width": "350",
      "margin-right": "20px",
      "margin-bottom": "20px",
      "margin-top": "20px",
      "margin-left": "20px"
    });
  // Constructing heading.
    var newProductCardHeading = $("<div>");
    newProductCardHeading.addClass("card-header");
    newProductCardHeading.css({
      "height": "290",
      "background-image": "url(" + product.category +  ")",
      "background-size": "contain",
    });
    //Adding "Add to Cart" button.
    var deleteBtn = $("<button>");
    deleteBtn.text("Add to Cart");
    deleteBtn.addClass("addcart btn btn-info btn-sm");
    //Appending "Add to Cart" button.
    newProductCardHeading.append(deleteBtn);
  // Constructing body.
    var newProductCardBody = $("<div>");
    newProductCardBody.addClass("card-body");
    newProductCardBody.css({
     "padding-top": "20px",
     "background-color" :"white"
    });
    //Adding product name.
    var newProductTitle = $("<h2>");
    newProductTitle.css({
     "font-size": "30px"
    });
   var newProductBodyTitle = $("<p>");
    newProductBodyTitle.css({
     "font-size": "20px"
    });
    newProductBodyTitle.text(product.title + " ");
    //Appending product name.
    newProductCardBody.append(newProductBodyTitle); 
    //Adding price.
    var newProductBodyPrice = $("<p>");
    newProductBodyPrice.css({
     float: "right",
     "font-size": "25px"
    });
    newProductBodyPrice.text("$ " + product.price);
    newProductCardBody.append(newProductBodyPrice);
    //Appending and posting on container.
    newProductCard.append(newProductCardHeading);
    newProductCard.append(newProductCardBody);
    newProductCard.data("product", product);
    return newProductCard;
  }



//--------------------------------------------------------------------
// POST FUNCTION -> Adding products to Cart database.           
//--------------------------------------------------------------------

  function addToCart() {
    var currentProduct = $(this)
      .parent()
      .parent()
      .data("product");
    var newPost = {
      sku: currentProduct.id,
      product: currentProduct.title,
      price: currentProduct.price
    };
      submitPost(newPost);
      function submitPost(Post) {
        $.post("/api/carts/", Post, function() {
        });
      }
      getCarts();
      totalUpdate();
  }



//--------------------------------------------------------------------
// DELETE FUNCTION -> Deleting products from cart database.           
//--------------------------------------------------------------------

  function cartDelete() {
    var currentCart = $(this)
      .parent()
      .data("product");
    deleteCart(currentCart.id);
  }

  function deleteCart(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/carts/" + id
    })
      .then(function() {
        getCarts();
        totalUpdate();
      });
  }



//--------------------------------------------------------------------
// PUT FUNCTION -> Changing quantity in cart database.           
//--------------------------------------------------------------------

  function changeQuantity() {
    newquantity = (this.value);
    var currentCart = $(this)
      .parent()
      .data("product");
      console.log(newquantity);
      console.log(currentCart);
      currentCart.quantity = newquantity;
      console.log(currentCart);
      updateCart(currentCart);
  }

  function updateCart(cart) {
    $.ajax({
      method: "PUT",
      url: "/api/carts",
      data: cart
    })
      .then(function() {
        getCarts();
        totalUpdate();
      });
  }



//--------------------------------------------------------------------
// CALCULATING TOTAL VALUE AND TOTAL QUANTITY IN CART.        
//--------------------------------------------------------------------

  function totalUpdate() {    
    $.get("/api/carts", function(data) {
      cartinfo = data;
    var totalcart = 0; 
    for (var i = 0; i < cartinfo.length; i++) {
      totalcart += (cartinfo[i].price*cartinfo[i].quantity);
    }
    console.log(totalcart.toFixed(2));

    $("#quantity-display").text('('+cartinfo.length+")  Total: $"+ totalcart.toFixed(2));
    });
  }
totalUpdate();



//--------------------------------------------------------------------
// BUILDING CART -> Getting products from Cart database and building html.        
//--------------------------------------------------------------------

  function getCarts() {    
    $.get("/api/carts", function(data) {
      products = data;
      initializeRow();
    });
  }
  getCarts();
  // Appending all products HTML inside container.
  function initializeRow() {
    cartContainer.empty();
    var productsToAdd = [];
    for (var i = 0; i < products.length; i++) {
      productsToAdd.push(createNewRowCart(products[i]));
    }
    cartContainer.append(productsToAdd);
  }
   // This function constructs cart HTML.
  function createNewRowCart(product) {
    var newProductCardBody = $("<div>");
    newProductCardBody.addClass("row");
    newProductCardBody.css({
     "width": "500px",
     "margin-bottom": "10px",
     "margin-left": "50px",
     "margin-top": "2px"
    });
    //Creating title
    var newProductBodyTitle = $("<div>");
    newProductBodyTitle.addClass("col-md-5");
    newProductBodyTitle.text(product.product);
    //Creating price
    var newProductBodyPrice = $("<div>");
    newProductBodyPrice.addClass("price col-3");
    newProductBodyPrice.text("$ " + product.price);
    //Creating quantity number.
    var qtNum = $("<input type='text' style='text-align:center;' name='qtt' value="+product.quantity+">");
    qtNum.text(product.price);
    qtNum.css({
     "margin-left": "3px",
     "margin-right": "25px",
     "height": "25px",
     "width": "30px"
    });
    //Creating button
    var sumBtn = $("<button value="+product.id+">");
    sumBtn.text("Delete");
    sumBtn.addClass("delete btn-danger btn-xs");
    sumBtn.css({
     "height": "25px"
    });
    //Appending title
    newProductCardBody.append(newProductBodyTitle);    
    //Appending price
    newProductCardBody.append(newProductBodyPrice);
    //Appending quantity
    newProductCardBody.append(qtNum);
   //Appending - button
    newProductCardBody.append(sumBtn);
    newProductCardBody.data("product", product);
    return newProductCardBody;
      }
    });


//--------------------------------------------------------------------
// OPEN CART DIV -> Shopping Cart button.         
//--------------------------------------------------------------------
  function showCart() {
    
    var x = document.getElementById("cartContainer");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }



