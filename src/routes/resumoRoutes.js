const resumoController = require('../controllers/resumoController');

module.exports = (app) => {
  app.route('/resumo/:ano/:mes').get(resumoController.getResumoMensal);
};
