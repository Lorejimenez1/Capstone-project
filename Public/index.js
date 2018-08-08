const NEWS_URL = "localhost:8080/news-posts"
const FORUMS_URL = "/player-posts"



const playerEntryTemplate = (

    '<p><span class="player-post js-player-post"></span></p>' +
    '<div class="shopping-item-controls">'+
    '<p class="user-name">By <%= user.username %></p>' +
    '<button class="js-shopping-item-delete">' +
    '<span class="button-label">delete</span>' +
    '</button>' +
    '</div>'


);
const MOCK_STATUS_UPDATES = {
"newsPosts": [
    {
    "id": "111",
    "title": "EPic games latest esports statement",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS51QW0qiuoA70YfMV77abg-hfzFio33d8Iu1Zs-y2waD7H8qLJDQ",
    "publishedAt": "1470016976609"
    },
     {
    "id": "222",
    "title": "placeholder",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. ",
         "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS51QW0qiuoA70YfMV77abg-hfzFio33d8Iu1Zs-y2waD7H8qLJDQ",
    "publishedAt": "1470016976609"
    },
     {
    "id": "333",
    "title": "placeholder",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. ",
         "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS51QW0qiuoA70YfMV77abg-hfzFio33d8Iu1Zs-y2waD7H8qLJDQ",
    "publishedAt": "1470016976609"
    },
    ]
};

function getRecentStatusUpdates(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_STATUS_UPDATES)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayStatusUpdates(data) {
    for (index in data) {
       $('#js-news-results').append(
        `  	<div class=col-4>
  		<div class="card w3-hover-grayscale">
  			<img class="card-image" alt=""
  			src="${data[index].imageUrl}">
  			<div class="card-content">
  				<h3><a href="${data[index].url}" target="_blank">${data[index].title}</a>
  				</h3>
				</div>
			</div>		
  	</div>
`);
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayStatusUpdates() {
    getRecentStatusUpdates(displayStatusUpdates);
}
/*
var myIndex = 0;
carousel();

function carousel() {



    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 2000); // Change image every 2 seconds
}
*/

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}



function getAvailablePlayers(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_STATUS_UPDATES)}, 100);
}

function getAndDisplayFreePlayers() {
    console.log('Retrieving  posts');
    $.getJSON(FORUMS_URL, function(items) {
        console.log('Rendering shopping list');
        var itemElements = items.map(function(item) {
            var element = $(playerEntryTemplate);
            element.attr('id', item.id);
            var itemName = element.find('.js-player-post');
            itemName.text(item.content);
            return element
        });
        $('.js-post-results').html(itemElements);


            ;
    });
}

function addPlayerPost(post) {
    console.log('Adding : ' + post);
    $.ajax({
        method: 'POST',
        url: FORUMS_URL,
        data: JSON.stringify(item),
        success: function(data) {
            getAndDisplayFreePlayers();
        },
        dataType: 'json',
        contentType: 'application/json'
    });
}

function handlePlayerPostAdd() {

    $('#js-player-entry-form').submit(function (e) {
        e.preventDefault();
        addPlayerPost({
            content: $(e.currentTarget).find('#js-new-player').val(),
            username: user.username
        });
    });
}

$(function() {
    getAndDisplayStatusUpdates();
    getAndDisplayFreePlayers();
    handlePlayerPostAdd();
});