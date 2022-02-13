const despesas = require('./despesasRoutes');
const receitas = require('./receitasRoutes');
const resumo = require('./resumoRoutes');
const usuarios = require('./usuariosRoutes');

module.exports = (app) => {
  despesas(app);
  receitas(app);
  resumo(app);
  usuarios(app);
};
