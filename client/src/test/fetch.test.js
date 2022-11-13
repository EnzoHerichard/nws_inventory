import request from 'supertest';
import app from '../../../server/index';

describe('POST /create', function () {
    it('should create a new material', function (done) {
        request(app)
           .post('/create')
           .send({name: 'Iphone', description: 'Abimé'})
           .expect(200, done)  
    })
})

describe('GET /materials', function () {
    it('should get the materials', function (done) {
        request(app)
            .get('/materials')
            .expect(200, done)
    })
})
describe('PUT /update', function () {
    it('should update a material', function (done) {
        request(app)
        .put('/update/2')
        .send({name: "tablette samsung"})
        .expect(200,done)
})
})
describe('DELETE /delete/:id', function () {
    it('should delete a material', function (done) {
        request(app)
            .delete('/delete/1')
            .expect(200, done)
    })
})
describe('POST /createReservation', function () {
    it('should create a new reservation', function (done) {
        request(app)
           .post('/createReservation')
           .send({firstName: 'Enzo', lastName: 'Herichard',email:'herichardenzo@gmail.com', dateDeb: '2022-11-06', dateFin: '2022-12-07'})
           .expect(200, done)  
    })
})
describe('GET /reservations', function () {
    it('should get the reservations', function (done) {
        request(app)
            .get('/reservations')
            .expect(200, done)
    })
})
describe('GET /materialsNR', function () {
    it('should get the materials not reserved', function (done) {
        request(app)
            .get('/materialsNR')
            .expect(200, done)
    })
})
describe('DELETE /deleteReservation/:id', function () {
    it('should delete a reservation', function (done) {
        request(app)
            .delete('/deleteReservation/1')
            .expect(200, done)
    })
})