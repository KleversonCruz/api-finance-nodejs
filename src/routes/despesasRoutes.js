const DespesasController = require('../controllers/despesasController');
const authentication = require('../middlewares/authentication');
const {
  despesaValidationRules,
  validate,
} = require('../middlewares/validator');

module.exports = (app) => {
  app.use('/despesas', authentication.bearer);

  app
    .route('/despesas')
    .get(DespesasController.getAllByDescricao)
    .post(despesaValidationRules, validate, DespesasController.add);

  app
    .route('/despesas/:id')
    .get(DespesasController.getOne)
    .put(despesaValidationRules, validate, DespesasController.update)
    .delete(DespesasController.remove);

  app.route('/despesas/:ano/:mes').get(DespesasController.getAllByDate);
};
