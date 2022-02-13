const ReceitasController = require('../controllers/receitasController');
const authentication = require('../middlewares/authentication');
const {
  receitaValidationRules,
  validate,
} = require('../middlewares/validator');

module.exports = (app) => {
  app.use('/receitas', authentication.bearer);

  app
    .route('/receitas')
    .get(ReceitasController.getAllByDescricao)
    .post(receitaValidationRules, validate, ReceitasController.add);

  app
    .route('/receitas/:id')
    .get(ReceitasController.getOne)
    .put(receitaValidationRules, validate, ReceitasController.update)
    .delete(ReceitasController.remove);

  app.route('/receitas/:ano/:mes').get(ReceitasController.getAllByDate);
};
