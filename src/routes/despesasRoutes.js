const despesasController = require('../controllers/despesasController');
const {
  despesaValidationRules,
  validate,
} = require('../middlewares/validator');

module.exports = (app) => {
  app
    .route('/despesas')
    .get(despesasController.getAllByDescricao)
    .post(despesaValidationRules, validate, despesasController.add);

  app
    .route('/despesas/:id')
    .get(despesasController.getOne)
    .put(despesaValidationRules, validate, despesasController.update)
    .delete(despesasController.remove);

  app.route('/despesas/:ano/:mes').get(despesasController.getAllByDate);
};
