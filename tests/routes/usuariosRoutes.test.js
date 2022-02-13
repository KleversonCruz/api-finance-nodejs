const app = require('../../src/app');
const tokens = require('../../src/auth/tokens');
const request = require('supertest');

const usuario = {
  id: null,
  nome: 'test',
  email: 'test@test.com',
  senha: '123456',
};

const token = tokens.access.create(1);

describe('Testando rotas de usuarios', () => {
  test('POST /usuarios', async () => {
    const res = await request(app)
      .post('/usuarios')
      .auth(token, { type: 'bearer' })
      .send(usuario);

    usuario.id = res.body.id;
    expect(res.statusCode).toEqual(201);
  });

  test('POST /usuarios/login', async () => {
    const res = await request(app).post('/usuarios/login').send(usuario);

    expect(res.statusCode).toEqual(204);
  });

  test('GET /usuarios', async () => {
    const res = await request(app)
      .get('/usuarios')
      .auth(token, { type: 'bearer' });

    expect(res.statusCode).toEqual(200);
  });

  test('DELETE /usuarios/:id', async () => {
    const res = await request(app)
      .delete(`/usuarios/${usuario.id}`)
      .auth(token, { type: 'bearer' });

    expect(res.statusCode).toEqual(200);
  });
});
