const app = require('../../src/app');
const tokens = require('../../src/auth/tokens');
const request = require('supertest');

const token = tokens.access.create(1);

describe('Testando rotas de resumo', () => {
  test('POST /resumo', async () => {
    const res = await request(app)
      .get(`/resumo/${new Date().getUTCFullYear()}/${new Date().getUTCMonth()}`)
      .auth(token, { type: 'bearer' });
      
    expect(res.statusCode).toEqual(200);
  });
});
