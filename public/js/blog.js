
// Dcument Ready Function.
$(document).ready(function() {
  // Holds products display.
  var blogContainer = $(".blog-container");
  // Holds cart display.
  var bagContainer = $("#myDIV");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  postCategorySelect.on("change", handleCategoryChange);
  var posts;
  // Add to Cart button.
  $(document).on("click", "button.delete", handlePostDelete);

  // This function grabs products from the database and updates the view
  function getPosts(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/posts" + categoryString, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // REMOVE IT!!!
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
      .then(function() {
        getPosts(postCategorySelect.val());
      });
  }


  // Getting the list of products
  getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside container
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // Constructs the HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    newPostCard.css({
      float: "left",
      "background-color": "#DCDCDC",
      "height": "300",
      "width": "350",
      "margin-right": "20px",
      "margin-bottom": "20px",
      "margin-top": "20px",
      "margin-left": "20px"
    });

    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    newPostCardHeading.css({
      "height": "290",
      "background-image": "url(/images/cupcake1.jpg)",
      "background-size": "cover"
    });

    //Adding button
    var deleteBtn = $("<button>");
    deleteBtn.text("Add to Cart");
    deleteBtn.addClass("delete btn btn-info btn-sm");

    var newPostTitle = $("<h2>");
    newPostTitle.css({
     "font-size": "30px"
    });

    //Appending button
    newPostCardHeading.append(deleteBtn);

    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    newPostCardBody.css({
     "padding-top": "20px",
     "background-color" :"white"
    });

    var newPostBodyPrice = $("<p>");
    newPostBodyPrice.css({
     float: "right",
     "font-size": "25px"
    });
    newPostBodyPrice.text("$ " + post.price);
    newPostCardBody.append(newPostBodyPrice);

   var newPostBodyTitle = $("<p>");
    newPostBodyTitle.css({
     "font-size": "20px"
    });
    newPostBodyTitle.text(post.title + " ");
    newPostCardBody.append(newPostBodyTitle);    

    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }



 

  var bag = [];
  var bagid = [];
  //Getting product id
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    //Adding ids  
    bag += (currentPost.id);

    bag = Array.from(bag);


    $.get("/api/posts", function(data) {
      posts = data;

    for (var i = 0; i < bag.length; i++) {
        for (var j = 0; j < posts.length; j++) {
            if (bag[i] == posts[j].id) {
              bagid.push(posts[j].id);
            }
        }
    }

    function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }

    bagid = bagid.filter(onlyUnique);
    $("#example").text('('+bagid.length+") Items in your Cart" );


    bagContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < bagid.length; i++) {
      console.log(posts[(bagid[i]-1)]);
      postsToAdd.push(createNewRow(posts[(bagid[i]-1)]));
    }
    bagContainer.append(postsToAdd);


   // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card-cart");
    newPostCard.css({
      "height": "35px",
      "width": "300px",
    });

    var newPostTitle = $("<h2>");
    newPostTitle.css({
     "font-size": "30px"
    });

    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body-cart");

    var newPostBodyPrice = $("<p>");
    newPostBodyPrice.css({
     "float": "right",
     "font-size": "15px"
    });
    newPostBodyPrice.text("$ " + post.price);
    newPostCardBody.append(newPostBodyPrice);

   var newPostBodyTitle = $("<p>");
    newPostBodyTitle.css({
     "font-size": "15px"
    });
    newPostBodyTitle.text(post.title);
    newPostCardBody.append(newPostBodyTitle);    

    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
      }

    });
  }


  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newPostCategory = $(this).val();
    getPosts(newPostCategory);
  }

});


  // Function uses Shopping Card button to open Cart DIV.
  function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
