const chai = require("chai");
const chaiHttp = require("chai-http");

const {app, runServer, closeServer} = require("../server.js");
const expect = chai.expect;
const mongoose = require('mongoose');
const {Settings} = require('../models/settingsModel');

chai.use(chaiHttp);

describe('root server', function() {
    it("should exist", function() {
        return chai
            .request(app)
            .get("/")
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });
});

describe(" Player Settings endpoint", function() {
	before(function() {
    return runServer();
      });

  after(function() {
    return closeServer();
  });

  it("should list player settings on Get", function() {
  	return chai
  	.request(app)
  	.get("/pro-settings")
  	.then(function(res) {
  		  expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a("array");
        res.body.forEach(function(item) {
          expect(item).to.be.a("object");
          expect(item).to.have.all.keys(
            "player",
            "mouse",
            "sensitivity",
            "dpi",
            "ads",
            "ScopeSensitivity",
            "keyboard"
          );
        });
      });
  });
  it("Should add a single players settings on POST", function() {
  	const newPlayer = {
  	player: "Risker",
    mouse: "Logitech g403",
    sensitivity: 0.06,
    dpi: 1000,
    ads: 1.0,
    ScopeSensitivity: 1.0,
    keyboard: "CM Storm Quickfire"
  	};
  	  return chai
      .request(app)
      .post("/pro-settings")
      .send(newPlayer)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a("object");
        expect(res.body.player).to.equal(newPlayer.player);
        expect(res.body.mouse).to.equal(newPlayer.mouse);
        expect(res.body.keyboard).to.equal(newPlayer.keyboard);
      });
  });
  it("should error if POST is missing expected values", function() {
  	const badRequest = {};
  	return chai
  		.request(app)
  		.post("/pro-settings")
  		.send(badRequest)
  		.then(function(res) {
  			expect(res).to.have.status(400);
  		});

  });
  it("should update a players settings on PUT", function() {
  	 const updatedPost = {
             	player: "Risker",
    					mouse: "Logitech g403",
    					sensitivity: 0.06,
    					dpi: 1000,
  					  ads: 1.0,
    					ScopeSensitivity: 1.0,
    					keyboard: "CM Storm Quickfire"
          };
     return Settings
        .findOne()
        .then(post => {
          updatedPost.id = post.id;
          return chai.request(app)
            .put(`/pro-settings/${post.id}`)
            .send(updatedPost);
        })
        .then(res => {
          expect(res).to.have.status(200);
        })

        });
    
 
    it('should delete a post by id', function () {

      let post;

      return Settings
        .findOne()
        .then(_post => {
          post = _post;
          return chai.request(app).delete(`/pro-settings/${post.id}`);
        })
        .then(res => {
         expect(res).to.have.status(204);
        })
       
        });
});
describe(" User Posts endpoint", function() {
	before(function() {
    return runServer();
      });

  after(function() {
    return closeServer();
  });
  it("should list players posts on Get", function() {
  	return chai
  	.request(app)
  	.get("/player-posts")
  	.then(function(res) {
  		  expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a("array");
        res.body.forEach(function(item) {
          expect(item).to.be.a("object");
          expect(item).to.have.all.keys(
          	"id",
            "username",
            "content",
          );
        });
      });
  });
    it("Should add new player post on POST", function() {
  	const newPost = {
  	username: "Risker",
    content: "lorem ipsum"
  	};
  	  return chai
      .request(app)
      .post("/player-posts")
      .send(newPost)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a("object");
        expect(res.body.username).to.equal(newPost.username);
        expect(res.body.content).to.equal(newPost.content);
      });
  });
});
