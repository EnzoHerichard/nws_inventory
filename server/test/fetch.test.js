const request = require('supertest');
const app = require('../index');
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");

chai.use(chaiHttp);

let materialLength

describe('POST /create', function (done) {
    it('should create a new material', function () {
        request(app)
           .post('/create')
           .send({"name": 'Iphone', "description": 'Abimé'})
           .set('Accept', 'application/json')
           .expect('Content-Type', /json/)
           .expect(200, done)  
    })
})

describe('GET /materials', function (done) {
    it('should get the materials', function () {
        chai
            .request(app)
            .get('/materials')
            .end((err, res) => {
                expect(res).to.have.property("statusCode", 200);
                done();
                materialLength = res.body.length;
              });
    })
})
describe('PUT /update', function (done) {
    it('should update a material', function () {
        request(app)
        .put('/update/2')
        .send({name: "tablette samsung"})
        .expect(200,done)
})
})
describe('DELETE /delete/:id', function (done) {
    it('should delete a material', function () {
        request(app)
            .delete('/delete/1')
            .expect(200, done)
    })
})
describe('POST /createReservation', function (done) {
    it('should create a new reservation', function () {
        request(app)
           .post('/createReservation')
           .send({firstName: 'Enzo', lastName: 'Herichard',email:'herichardenzo@gmail.com', dateDeb: '2022-11-06', dateFin: '2022-12-07'})
           .expect(200, done)  
    })
})
describe('GET /reservations', function (done) {
    it('should get the reservations', function () {
        request(app)
            .get('/reservations')
            .expect(200, done)
    })
})
describe('GET /materialsNR', function (done) {
    it('should get the materials not reserved', function () {
        request(app)
            .get('/materialsNR')
            .expect(200, done)
    })
})
describe('DELETE /deleteReservation/:id', function (done) {
    it('should delete a reservation', function () {
        request(app)
            .delete('/deleteReservation/1')
            .expect(200, done)
    })
})