const fetch = require('node-fetch');
const chai = require('chai');
const expect = chai.expect;

describe('User Routes, Controller, and Factory (Unit Tests)',async()=>{

  it('User Routes, Controller, and Factory (Unit Tests)',async()=>{

      const response = await fetch('https://user-task-3kj1.onrender.com/users');
      expect(response.status).to.equal(200);
      const data = await response.json();
      console.log(data);
  }).timeout(40000);

    it('User Routes, Controller, and Factory (Unit Tests)',async()=>{

        const response = await fetch('https://user-task-3kj1.onrender.com/users');
        expect(response.status).to.equal(400);
        const data = await response.json();
        console.log(data);
    }).timeout(40000);
})