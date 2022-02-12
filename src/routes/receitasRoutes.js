const receitasController = require('../controllers/receitasController');
const {
  receitaValidationRules,
  validate,
} = require('../middlewares/validator');

module.exports = (app) => {
  app
    .route('/receitas')
    .get(receitasController.getAllByDescricao)
    .post(receitaValidationRules, validate, receitasController.add);

  app
    .route('/receitas/:id')
    .get(receitasController.getOne)
    .put(receitaValidationRules, validate, receitasController.update)
    .delete(receitasController.remove);

  app.route('/receitas/:ano/:mes').get(receitasController.getAllByDate);
};
