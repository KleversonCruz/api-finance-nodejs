const despesas = require('./despesasRoutes');
const receitas = require('./receitasRoutes');
const resumo = require('./resumoRoutes');
const usuarios = require('./usuariosRoutes');

module.exports = (app) => {
  app.route('/').get(function (req, res) {
    res.redirect('https://documenter.getpostman.com/view/16890150/UVeNm2w8');
  });

  despesas(app);
  receitas(app);
  resumo(app);
  usuarios(app);
};
