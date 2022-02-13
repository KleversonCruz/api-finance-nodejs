const app = require('../../src/app');
const tokens = require('../../src/auth/tokens');
const request = require('supertest');

const receita = {
  id: null,
  descricao: 'Teste ' + new Date().toISOString(),
  valor: 1,
  data: new Date().toISOString().slice(0, 10),
};

const token = tokens.access.create(1);

describe('Testando rotas de receitas', () => {
  test('POST /receitas', async () => {
    const res = await request(app)
      .post('/receitas')
      .auth(token, { type: 'bearer' })
      .send(receita);
      
    receita.id = res.body.id;
    expect(res.statusCode).toEqual(201);
  });

  test('GET /receitas', async () => {
    const res = await request(app)
      .get('/receitas')
      .auth(token, { type: 'bearer' });

    expect(res.statusCode).toEqual(200);
  });

  test('GET /receitas/:id', async () => {
    const res = await request(app)
      .get(`/receitas/${receita.id}`)
      .auth(token, { type: 'bearer' });

    expect(res.statusCode).toEqual(200);
  });

  test('GET /receitas/:ano/:mes', async () => {
    const res = await request(app)
      .get(
        `/receitas/${new Date().getUTCFullYear()}/${new Date().getUTCMonth()}`,
      )
      .auth(token, { type: 'bearer' });

    expect(res.statusCode).toEqual(200);
  });

  test('PUT /receitas/:id', async () => {
    const res = await request(app)
      .put(`/receitas/${receita.id}`)
      .auth(token, { type: 'bearer' })
      .send(receita);

    expect(res.statusCode).toEqual(200);
  });

  test('DELETE /receitas/:id', async () => {
    const res = await request(app)
      .delete(`/receitas/${receita.id}`)
      .auth(token, { type: 'bearer' });

    expect(res.statusCode).toEqual(200);
  });
});
