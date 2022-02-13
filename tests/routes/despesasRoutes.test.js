const app = require('../../src/app');
const tokens = require('../../src/auth/tokens');
const request = require('supertest');

const despesa = {
  id: null,
  descricao: 'Teste ' + new Date().toISOString(),
  valor: 1,
  data: new Date().toISOString().slice(0, 10),
  categoria: 'Outras',
};

const token = tokens.access.create(1);

describe('Testando rotas de despesas', () => {
  test('POST /despesas', async () => {
    const res = await request(app)
      .post('/despesas')
      .auth(token, { type: 'bearer' })
      .send(despesa);

    despesa.id = res.body.id;
    expect(res.statusCode).toEqual(201);
  });

  test('GET /despesas', async () => {
    const res = await request(app)
      .get('/despesas')
      .auth(token, { type: 'bearer' });

    expect(res.statusCode).toEqual(200);
  });

  test('GET /despesas/:id', async () => {
    const res = await request(app)
      .get(`/despesas/${despesa.id}`)
      .auth(token, { type: 'bearer' });

    expect(res.statusCode).toEqual(200);
  });

  test('GET /despesas/:ano/:mes', async () => {
    const res = await request(app)
      .get(
        `/despesas/${new Date().getUTCFullYear()}/${new Date().getUTCMonth()}`,
      )
      .auth(token, { type: 'bearer' });

    expect(res.statusCode).toEqual(200);
  });

  test('PUT /despesas/:id', async () => {
    const res = await request(app)
      .put(`/despesas/${despesa.id}`)
      .auth(token, { type: 'bearer' })
      .send(despesa);

    expect(res.statusCode).toEqual(200);
  });

  test('DELETE /despesas/:id', async () => {
    const res = await request(app)
      .delete(`/despesas/${despesa.id}`)
      .auth(token, { type: 'bearer' });

    expect(res.statusCode).toEqual(200);
  });
});
