
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
    //Adding button
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





    newPostCardBody.append(qtNum);


   //Appending - button
    newPostCardBody.append(sumBtn);

    newPostCardBody.data("post", post);
    return newPostCardBody;
      }


    });
  }


// Click
$(document).on("click", ".sub", function(event){
  event.preventDefault();
  
  // Gets the State

  valor = ($(this.value));

  console.log(valor);

})


//jQuery.fn.init(valor)



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
