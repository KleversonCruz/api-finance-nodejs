const ResumoController = require('../controllers/resumoController');
const authentication = require('../middlewares/authentication');

module.exports = (app) => {
  app.use('/resumo', authentication.bearer);

  app.route('/resumo/:ano/:mes').get(ResumoController.getResumoMensal);
};
