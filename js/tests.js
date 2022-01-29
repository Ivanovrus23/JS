var chai = require('chai');
var testCase = require('mocha').describe;
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);


testCase('/GET posts', function(){
      it('it should GET all the posts', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
      });
  });
it('it should GET a posts by id', (done) => {
    const postsId =2;
    chai.request('https://jsonplaceholder.typicode.com')
        .get('/posts/' + postsId)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('userId');
            res.body.should.have.property('id');
            res.body.should.have.property('title');
            res.body.should.have.property('body');
            res.body.should.have.property('id').eq(1);

            done();
        });
});


it('it should GET return array', (done) => {
    const userId = '?userid=2';
    chai.request('https://jsonplaceholder.typicode.com')
        .get('/posts/' + userId)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
});


it('it should NOT GET one the posts', (done) => {
    const postsId = 106;
    chai.request('https://jsonplaceholder.typicode.com')
        .get('/posts/' + postsId)
        .end((err, res) => {
            res.should.have.status(404);
            res.text.should.be.eq("{}");
            done();
        });
});
testCase('/POST posts/', function () {
    it('it should POST', (done) => {
        const posts = {
            "userId": 2,
            "id": 18,
            "title": "voluptate et itaque vero tempora molestiae",
            "body": "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam"
        };
        chai.request('https://jsonplaceholder.typicode.com')
            .post('/posts')
            .send(posts)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('userId').eq(1);
                res.body.should.have.property('id').eq(101);
                res.body.should.have.property('title').eq("voluptate et itaque vero tempora molestiae");
                res.body.should.have.property('body').eq("eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam");
                done();

            });
    });
});