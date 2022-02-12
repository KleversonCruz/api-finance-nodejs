const despesas = require('./despesasRoutes');
const receitas = require('./receitasRoutes');
const resumo = require('./resumoRoutes');

module.exports = (app) => {
  despesas(app);
  receitas(app);
  resumo(app);
};
