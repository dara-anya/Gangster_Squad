
// Dcument Ready Function.
$(document).ready(function() {

  // Holding products display.
  var productsContainer = $(".products-container");

  // Holding cart display.
  var cartContainer = $("#cartContainer");

  var products;

  // Adding to Cart button.
  $(document).on("click", "button.delete", addToCart);
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
    deleteBtn.addClass("delete btn btn-info btn-sm");
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




  //This function creates the cart.
  //Declaring variables that will hold cart elements.
  var bag = [];
  var bagid = [];
  //Getting product id
  function addToCart() {
    var currentProduct = $(this)
      .parent()
      .parent()
      .data("product");
    //Adding ids  
    bag += (currentProduct.id);
    //Transforming ids in array.
    bag = Array.from(bag);
    // Getting products from database.
    $.get("/api/products", function(data) {
    //Matching products x bag and pushing to bagid.
    for (var i = 0; i < bag.length; i++) {
        for (var j = 0; j < products.length; j++) {
            if (bag[i] == products[j].id) {
              bagid.push(products[j].id);
            }
        }
    }
    //Uninique value function.
    function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }
    //Getting only unique values.
    bagid = bagid.filter(onlyUnique);
    //Adding quantity of items.
    $("#quantity-display").text('('+bagid.length+") Items in your Cart" );
    cartContainer.empty();
    var productsToAdd = [];
    //Getting products from bagid.
    for (var i = 0; i < bagid.length; i++) {
      productsToAdd.push(createNewRow(products[(bagid[i]-1)]));
    }
    cartContainer.append(productsToAdd);

   // This function constructs cart HTML.
  function createNewRow(product) {
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
    newProductBodyTitle.text(product.title);
    //Creating price
    var newProductBodyPrice = $("<div>");
    newProductBodyPrice.addClass("price col-3");
    newProductBodyPrice.text("$ " + product.price);
    //Creating quantity number.
    var qtNum = $("<input type='text' style='text-align:center;' name='qtt' value=1>");
    qtNum.text(product.price);
    qtNum.css({
     "margin-left": "3px",
     "margin-right": "25px",
     "height": "25px",
     "width": "30px"
    });

    //Creating button
    var sumBtn = $("<button>");
    sumBtn.text("Delete");
    sumBtn.addClass("btn btn-danger btn-xs");
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
  }
});


$.get("/api/carts", function(data) {
    console.log(data);

});



  // Function uses Shopping Cart button to open Cart DIV.
  function showCart() {
    //$("#cartContainer").css("display", "none");
    var x = document.getElementById("cartContainer");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }



