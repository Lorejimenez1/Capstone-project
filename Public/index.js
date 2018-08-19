const NEWS_URL = "/news-posts";
const FORUMS_URL = "/player-posts";
const SETTINGS_URL = "/pro-settings";
let currentUser = $('#new-author').html();


function getRecentNews(callbackFn) {
    setTimeout(function(){$.getJSON(NEWS_URL, callbackFn)}, 100);

}

// this function stays the same when we connect
// to real API later
function displayNews(data) {

    for (index in data) {
       $('#js-news-results').append(
        `  	<div class=col-4>
  		<div class="card w3-hover-grayscale">
  			<img class="card-image" alt=""
  			src="${data[index].imageURL}">
  			<div class="card-content">
  				<h3><a href="${data[index].url}" target="_blank">${data[index].title}</a>
  				</h3>
  				<p>${data[index].source}</p>
				</div>
			</div>		
  	</div>
`);
    }


}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayNews() {
    getRecentNews(displayNews);
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

function responsiveNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function addPlayerPost(post) {
    console.log('Adding : ' + post);
    $.ajax({
        method: 'POST',
        url: FORUMS_URL,
        data: JSON.stringify(post),
        success: function() {
            getAndDisplayPlayerPosts();
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
            username: currentUser
        });
    });
}

function getSettings(callback) {
    console.log('getting: Pro Settings');
    $.ajax({
        method: 'get',
        url: SETTINGS_URL,
        dataType: 'json',
        success: callback,

    });
}

function displaySettings(data) {

    console.log(data)
    for (index in data) {
        $('.grid-body').append(
            ` <tr>
                 <td>${data[index].player}</td>
                 <td>${data[index].mouse}</td>
                 <td>${data[index].sensitivity}</td>
                 <td>${data[index].dpi}</td>
                 <td>${data[index].ads}</td>
                 <td>${data[index].ScopeSensitivity}</td>
                 <td>${data[index].keyboard}</td>    
              </tr>
            `
            );
    }
}

function getAndDisplaySettings() {
    getSettings(displaySettings);
}

function getPosts(callbackFn) {
    setTimeout(function(){$.getJSON(FORUMS_URL, callbackFn)}, 100);
}
function displayPosts(data) {
    $('.js-post-results').empty();
    for (index in data) {
        $('.js-post-results').append( `<div class="col-12 js-forum" id="js-forum-${data[index].username}-${data[index].id}"><p class="p-player-post"><span class="player-post js-player-post">${data[index].content}</span></p>
            <p class="user-name" id ="js-username-p">Post by ${data[index].username}</p>`)
            if( currentUser === `${data[index].username}`) {
            console.log('adding delete button')
                $(`#js-forum-${data[index].username}-${data[index].id}`).append(`<button class="js-shopping-item-delete">
            <span class="button-label">delete</span></button><p id="objID">${data[index].id}</p>`)

            }

        }





}
function getAndDisplayPlayerPosts() {
    getPosts(displayPosts);
}
function handleDeletePost() {
    $('.js-post-results').on('click', 'button', function(event) {
        event.preventDefault();
        let query = $('.js-forum').find('#objID').html();
        console.log(query);
        deletePost(query);
});
}
function deletePost(query) {
    $.ajax({
        url: `/player-posts/${query}`,
        type: 'DELETE',
        success: function() {
            getAndDisplayPlayerPosts();
        }


    });

}

$(function() {
    responsiveNav();
    getAndDisplaySettings();
    getAndDisplayNews();
    getAndDisplayPlayerPosts();
    handlePlayerPostAdd();
    handleDeletePost();
});