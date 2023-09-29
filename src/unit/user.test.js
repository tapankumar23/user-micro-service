const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { app, server } = require('../index'); 
const User = require('../models/user'); 

chai.use(chaiHttp);

describe('User Routes, Controller, and Factory (Unit Tests)', () => {
    // Before running the unit tests, set up any necessary stubs or mocks
    before(() => {
         // Stub User.createUser to return a fake user
       const createUserStub = sinon.stub(User, 'createUser').resolves({
            _id: '65153b534b51b249d08d138c',
            name: 'Dummy User',
            email: 'dummy@example.com',
            age: 77
        });
          // Stub user.generateAuthToken to return a mock token
        const generateAuthTokenStub = sinon.stub().resolves('your-generated-token-here');
        createUserStub.returns({ generateAuthToken: generateAuthTokenStub });        });
  
    // After running the unit tests, restore stubs and clean up
    after(() => {
      sinon.restore();
      server.close();
    });
  
    describe('User Routes', () => {
      it('should handle POST /api/user/sign-up', async () => {
        // Simulate a POST request to the route and test the behavior
        const response = await chai
          .request(app)
          .post('/api/user/sign-up')
          .send({
            "name":"ravi",
            "age":27,
            "email":"ravi001101@tmpeml.com",
            "password":"t23s70y"
        });
        // Add assertions for the expected behavior
        chai.expect(response).to.have.status(200); 
        sinon.assert.calledWithExactly(User.createUser, {
            "name":"ravi",
            "age":27,
            "email":"ravi001101@tmpeml.com",
            "password":"t23s70y"
        });
      });  
    });
});

