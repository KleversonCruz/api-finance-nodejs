const passport = require('passport');

module.exports = {
  local: (req, res, next) => {
    passport.authenticate(
      'local',
      { session: false },
      (erro, usuario, info) => {
        if (erro) {
          return next(erro);
        }

        if (!usuario) {
          return res.status(401).json();
        }

        req.user = usuario;
        req.isAuthenticated = true;
        return next();
      },
    )(req, res, next);
  },

  bearer: (req, res, next) => {
    passport.authenticate(
      'bearer',
      { session: false },
      (erro, usuario, info) => {
        if (erro && erro.name === 'JsonWebTokenError') {
          return res.status(401).json();
        }

        if (erro && erro.name === 'TokenExpiredError') {
          return res.status(401).json();
        }

        if (!usuario) {
          return res.status(401).json();
        }

        req.user = usuario;
        req.isAuthenticated = true;
        return next();
      },
    )(req, res, next);
  },
};
