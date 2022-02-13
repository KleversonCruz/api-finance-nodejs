const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const tokens = require('./tokens');
const { InvalidArgumentError } = require('../errors');
const { UsuariosService } = require('../services');

const usuarioService = new UsuariosService();

function verifyUser(usuario) {
  if (!usuario) {
    throw new InvalidArgumentError('Não existe usuário com esse e-mail');
  }
}

async function verifyPassword(senha, senhaHash) {
  const senhaValida = await bcrypt.compare(senha, senhaHash);
  if (!senhaValida) {
    throw new InvalidArgumentError('E-mail ou senha inválidos');
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
      session: false,
    },
    async (email, senha, done) => {
      try {
        const usuario = await usuarioService.getOne({ email });
        verifyUser(usuario);
        await verifyPassword(senha, usuario.senha);
        done(null, usuario);
      } catch (erro) {
        done(erro);
      }
    },
  ),
);

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const id = await tokens.access.verify(token);
      const usuario = await usuarioService.getOne({ id });
      done(null, usuario);
    } catch (erro) {
      done(erro);
    }
  }),
);
