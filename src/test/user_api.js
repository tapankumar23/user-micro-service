const fetch = require('node-fetch');
const chai = require('chai');
const expect = chai.expect;

describe('User Routes, Controller, and Factory (end-to-end test)', async () => {
    const environment = process.env.ENVIRONMENT;
    console.log(`Running test on ${environment}`);

    it('User Routes, Controller, and Factory (end-to-end test)', async () => {

        const response = await fetch('https://user-task-3kj1.onrender.com/users');
        expect(response.status).to.equal(200);
        const data = await response.json();
        console.log(data);
    }).timeout(40000);
})