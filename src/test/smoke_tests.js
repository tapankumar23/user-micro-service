const fetch = require('node-fetch');
const chai = require('chai');
const expect = chai.expect;

describe('User service smoke tests', async () => {

    it('Should be able to get the users', async () => {

        const response = await fetch('https://user-service-azky.onrender.com/api/user/get-all-users');
        expect(response.status).to.equal(200);
        const data = await response.json();
        console.log(data);
    }).timeout(40000);
})