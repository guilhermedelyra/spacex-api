const supertest = require('supertest');
const app = require('../src/app');

const request = supertest(app);

describe('Launches', () => {
  it('get next launch', async () => {
    const response = await request.get('/launches/next');
    expect(response.status).toBe(200);
  });
});
