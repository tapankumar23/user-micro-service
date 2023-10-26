const fetch = require('node-fetch');
const chai = require('chai');
const expect = chai.expect;

describe('Checking health of the service', async () => {

    it('Health Check', async () => {

        const response = await fetch('https://user-task-3kj1.onrender.com/users');
        expect(response.status).to.equal(200);
        const data = await response.json();
        console.log(data);
    }).timeout(40000);
})