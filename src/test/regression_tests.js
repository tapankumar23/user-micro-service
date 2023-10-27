const fetch = require('node-fetch');
const chai = require('chai');
const expect = chai.expect;

describe('User service regression tests', async () => {

    it('Regression Test 1', async () => {

        const response = await fetch('https://user-service-azky.onrender.com/api/user/get-all-users');
        expect(response.status).to.equal(200);
        const data = await response.json();
        console.log(data);
    }).timeout(40000);

    it('Regression Test 2', async () => {

        const response = await fetch('https://user-service-azky.onrender.com/api/user/get-all-users');
        expect(response.status).to.equal(200);
        const data = await response.json();
        console.log(data);
    }).timeout(40000);
})