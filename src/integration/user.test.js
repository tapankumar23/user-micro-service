const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
let mongoServer;
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { app, server } = require('../index'); 
const User = require('../models/user'); 

chai.use(chaiHttp);

describe('User Routes, Controller, and Factory (Unit Tests)',async () => {
    let generateAuthTokenStub;

    before(async() => {      
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await mongoose.connection.dropDatabase();

        // Create a stub for generateAuthToken
        generateAuthTokenStub = sinon.stub(User.prototype, 'generateAuthToken');
        generateAuthTokenStub.returns('mocked-token'); 
})
    after(async() => {
        await mongoose.disconnect();
        sinon.restore(); // Restore the stub
        mongoServer.stop()
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
        chai.expect(response.body.result.email).to.equal("ravi001101@tmpeml.com")
      });  
    });
});

