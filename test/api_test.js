let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server').app;
chai.use(chaiHttp);
chai.should();

describe('Testing if API endpoint provides right format of information', () => {
    describe('Valid User ID', () => {
        it('Responding with a JSON Object', (done) => {
            chai.request(app).get('/api/ccaad09f-b2b7-4e37-9a24-5266aebd6082')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});