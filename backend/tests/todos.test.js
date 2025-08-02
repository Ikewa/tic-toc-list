const request = require('supertest');
const app = require('../index');

describe('GET /todos', () => {
  it('should return 200 and an array', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

test('simple test works', () => {
  expect(1 + 1).toBe(2);
});

