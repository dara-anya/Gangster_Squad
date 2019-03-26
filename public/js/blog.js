$(document).ready(function() {
  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  postCategorySelect.on("change", handleCategoryChange);
  var posts;

  $(document).on("click", "button.delete", handlePostDelete);

  // This function grabs posts from the database and updates the view
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

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
      .then(function() {
        getPosts(postCategorySelect.val());
      });
  }



  // Getting the initial list of posts
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

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    newPostCard.css({
      float: "left",
      "background-color": "#DCDCDC",
      "height": "300",
      "width": "350",
      "margin-right": "17px",
      "margin-bottom": "20px"
    });
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    //Adding button
    var deleteBtn = $("<button>");
    deleteBtn.text("Add to Bag");
    deleteBtn.addClass("delete btn btn-info btn-sm");
    var newPostTitle = $("<h2>");
    newPostTitle.css({
     "font-size": "30px"
    });
    var newPostCategory = $("<h5>");
    newPostCategory.text(post.category);
    newPostCategory.css({
      float: "left",
      "margin-top":
      "-5px", "font-size": "12px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(post.title + " ");
    newPostBody.text(post.body);
    newPostCardHeading.append(newPostTitle);
    //Appending button
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(newPostCategory);
    newPostCardBody.append(newPostBody);
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
    console.log(bagid);
    $("#example").text(bagid);
    });
  }



  // This function displays a message when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("Sorry, no items in this category.");
    blogContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newPostCategory = $(this).val();
    getPosts(newPostCategory);
  }

});
