
// Dcument Ready Function.
$(document).ready(function() {

  // Holding products display.
  var productsContainer = $(".products-container");

  // Holding cart display.
  var cartContainer = $("#cartContainer");

  var posts;

  // Adding to Cart button.
  $(document).on("click", "button.delete", addToCart);
  // This function gets the products from database
  function getPosts() {    
    $.get("/api/posts", function(data) {
      posts = data;
      initializeRows();
    });
  }
  getPosts();

  // Appending all products HTML inside container.
  function initializeRows() {
    productsContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    productsContainer.append(postsToAdd);
  }

  // Constructing the HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    newPostCard.css({
      float: "left",
      "height": "300",
      "width": "350",
      "margin-right": "20px",
      "margin-bottom": "20px",
      "margin-top": "20px",
      "margin-left": "20px"
    });
  // Constructing heading.
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    newPostCardHeading.css({
      "height": "290",
      "background-image": "url(/images/cupcake1.jpg)",
      "background-size": "cover"
    });

    //Adding "Add to Cart" button.
    var deleteBtn = $("<button>");
    deleteBtn.text("Add to Cart");
    deleteBtn.addClass("delete btn btn-info btn-sm");
    //Appending "Add to Cart" button.
    newPostCardHeading.append(deleteBtn);
  // Constructing body.
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    newPostCardBody.css({
     "padding-top": "20px",
     "background-color" :"white"
    });
    //Adding product name.
    var newPostTitle = $("<h2>");
    newPostTitle.css({
     "font-size": "30px"
    });
   var newPostBodyTitle = $("<p>");
    newPostBodyTitle.css({
     "font-size": "20px"
    });
    newPostBodyTitle.text(post.title + " ");
    //Appending product name.
    newPostCardBody.append(newPostBodyTitle); 
    //Adding price.
    var newPostBodyPrice = $("<p>");
    newPostBodyPrice.css({
     float: "right",
     "font-size": "25px"
    });
    newPostBodyPrice.text("$ " + post.price);
    newPostCardBody.append(newPostBodyPrice);

    //Appending and posting on container.
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }





  //Declaring variables that will hold cart elements.
  var bag = [];
  var bagid = [];
  //Getting product id
  function addToCart() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    //Adding ids  
    bag += (currentPost.id);
    //Transforming ids in array.
    bag = Array.from(bag);
    // Getting products from database.
    $.get("/api/posts", function(data) {
    //Matching products x bag and pushing to bagid.
    for (var i = 0; i < bag.length; i++) {
        for (var j = 0; j < posts.length; j++) {
            if (bag[i] == posts[j].id) {
              bagid.push(posts[j].id);
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
    var postsToAdd = [];
    //Getting products from bagid.
    for (var i = 0; i < bagid.length; i++) {
      postsToAdd.push(createNewRow(posts[(bagid[i]-1)]));
    }
    cartContainer.append(postsToAdd);

   // This function constructs cart HTML.
  function createNewRow(post) {
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("row");
    newPostCardBody.css({
     "width": "500px",
     "margin-bottom": "10px",
     "margin-left": "50px",
     "margin-top": "2px"
    });
    //Creating title
    var newPostBodyTitle = $("<div>");
    newPostBodyTitle.addClass("col-md-5");
    //newPostBodyTitle.css({
    // "font-size": "15px"
    //});
    newPostBodyTitle.text(post.title);
    //Creating price
    var newPostBodyPrice = $("<div>");
    newPostBodyPrice.addClass("price col-3");
    newPostBodyPrice.text("$ " + post.price);
    //Creating quantity number.
    var qtNum = $("<input type='text' style='text-align:center;' name='qtt' value=1>");
    qtNum.text(post.price);
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
    newPostCardBody.append(newPostBodyTitle);    
    //Appending price
    newPostCardBody.append(newPostBodyPrice);
    //Appending quantity
    newPostCardBody.append(qtNum);
   //Appending - button
    newPostCardBody.append(sumBtn);
    newPostCardBody.data("post", post);
    return newPostCardBody;
      }
    });
  }
});

  // Function uses Shopping Cart button to open Cart DIV.
  function showCart() {
    var x = document.getElementById("cartContainer");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
