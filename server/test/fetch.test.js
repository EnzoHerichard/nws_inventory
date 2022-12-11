const app = require('../index.js');
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");

chai.use(chaiHttp);
describe('GET /materials', function (done) {
    it('status code = 200', function () {
        chai
            .request(app)
            .get('/materials')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
                materialLength = res.body.length;
              });
    })
    it('Should get the materials', function () {
        chai
            .request(app)
            .get("/materials")
            .end((err, res) => {
              expect(res.body).to.have.lengthOf(materialLength);
              done();
            });
    })
})
/* describe('POST /create', function (done) {
    it('should create a new material', function () {
        request(app)
            .post('/create')
            .send({"name": 'Iphone', "description": 'Abimé'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(res).to.have.status(200);
    })
}) */

/* describe('PUT /update', function (done) {
    it('should update a material', function () {
    chai
        .request(app)
        .put('/update/2')
        .send({name: "tablette samsung"})
        .expect(200,done)
})
}) */
describe('DELETE /delete/:id', function (done) {
    it('should delete a material', function () {
        chai
            .request(app)
            .delete('/delete/1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
              });
    })
})
/* describe('POST /createReservation', function (done) {
    it('should create a new reservation', function () {
        chai
           .request(app)
           .post('/createReservation')
           .send({firstName: 'Enzo', lastName: 'Herichard',email:'herichardenzo@gmail.com', dateDeb: '2022-11-06', dateFin: '2022-12-07'})
           .expect(200, done)  
    })
}) */
describe('GET /reservations', function (done) {
    it('should get the reservations', function () {
        chai
            .request(app)
            .get('/reservations')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
                reservationsLength = res.body.length;
              });
    })
})
describe('GET /materialsNR', function (done) {
    it('should get the materials not reserved', function () {
        chai
            .request(app)
            .get('/materialsNR')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
              });
    })
})
describe('DELETE /deleteReservation/:id', function (done) {
    it('should delete a reservation', function () {
        chai
            .request(app)
            .delete('/deleteReservation/1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
                materialLength = res.body.length;
              });
    })
})