const news_updates = {
"newsPosts": [
    {
    "id": "111",
    "title": "EPic games latest esports statement",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. ",
    "publishedAt": "1470016976609"
    },
     {
    "id": "222",
    "title": "placeholder",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. ",
    "publishedAt": "1470016976609"
    },
     {
    "id": "333",
    "title": "placeholder",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. ",
    "publishedAt": "1470016976609"
    },
    ]
}


function getRecentStatusUpdates(callbackFn) {
    setTimeout(function(){ callbackFn(news_updates)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayStatusUpdates(data) {
    for (index in data.newsPosts) {
       $('main').append(
        `<div class="row">
                <div class="col-12">
                    <h1>${data.newsPosts[index].title}</h1>
                        <p>${data.newsPosts[index].content}</p>
                        <p>Created by: Firstname Lastname</p>
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

$(function() {
    getAndDisplayStatusUpdates();
})