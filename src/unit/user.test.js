const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { app, server } = require('../index'); 
const User = require('../models/user'); 

chai.use(chaiHttp);

describe('User Routes, Controller, and Factory (Unit Tests)', () => {
    before(() => {
         // Stub User.createUser to return a Dummy user.
       const createUserStub = sinon.stub(User, 'createUser').resolves({
            _id: '65153b534b51b249d08d138c',
            name: 'Dummy User',
            email: 'dummy@example.com',
            age: 77
        });
          // Stub user.generateAuthToken to return a mock token
        const generateAuthTokenStub = sinon.stub().resolves('your-generated-token-here');
        createUserStub.returns({ generateAuthToken: generateAuthTokenStub });        });
  
    after(() => {
      sinon.restore();
      server.close();
    });
  
    describe('User Routes', () => {
      it('should handle POST /api/user/sign-up', async () => {
        const response = await chai
          .request(app)
          .post('/api/user/sign-up')
          .send({
            "name":"ravi",
            "age":27,
            "email":"ravi001101@tmpeml.com",
            "password":"t23s70y"
        });
        chai.expect(response).to.have.status(201); 
        sinon.assert.calledWithExactly(User.createUser, {
            "name":"ravi",
            "age":27,
            "email":"ravi001101@tmpeml.com",
            "password":"t23s70y"
        });
      });

        it('Failing test', async () => {
            const response = await chai
                .request(app)
                .post('/api/user/sign-up')
                .send({
                    "name":"ravi",
                    "age":27,
                    "email":"ravi001101@tmpeml.com",
                    "password":"t23s70y"
                });
            chai.expect(response).to.have.status(201);
            sinon.assert.calledWithExactly(User.createUser, {
                "name":"Ramesh",
                "age":27,
                "email":"ravi001101@tmpeml.com",
                "password":"t23s70y"
            });
        });
    });
});

