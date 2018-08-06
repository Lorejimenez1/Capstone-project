const NEWS_URL = "localhost:8080/news-posts"



const news_updates = {
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

function getRecentStatusUpdates(callback) {
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

function displayFreePlayers(data) {
    for (index in data.statusUpdates) {
        $('.js-post-results').append(
            `
                <div class="row">
                    <div class="col-12">
                       <h2>${data.statusUpdates[index].userName}</h2>
                       <p>${data.statusUpdates[index].text}</p>
                    </div>
        
                </div>
            
        `
            );
    }
}



function getAndDisplayFreePlayers() {
    (getAvailablePlayers(displayFreePlayers))
}

function watch signup()

$(function() {
    getAndDisplayStatusUpdates();
    getAndDisplayFreePlayers();
})