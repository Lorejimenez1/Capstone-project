const chai = require("chai");
const chaiHttp = require("chai-http");

const {app, runServer, closeServer} = require("../server2.js");

const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);
/*
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
*/
describe('delete endpoint', function () {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it('should delete post', function (done) {
        return chai
            .request(app)
            .get('/player-posts')
            .then(function(res) {
                return
            chai.request(app)
                .delete('/player-post/$({res.body[0]._id}');})
                .then(function (res) {
                    expect(res).to.have.status(204);
                    done()
                })


    });
});