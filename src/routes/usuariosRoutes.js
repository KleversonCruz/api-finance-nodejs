const UsuariosController = require('../controllers/usuariosController');
const authentication = require('../middlewares/authentication');
const {
  usuarioValidationRules,
  validate,
} = require('../middlewares/validator');

module.exports = (app) => {
  app
    .route('/usuarios')
    .post(
      authentication.bearer,
      usuarioValidationRules,
      validate,
      UsuariosController.add,
    )
    .get(authentication.bearer, UsuariosController.getAll);

  app
    .route('/usuarios/:id')
    .delete(authentication.bearer, UsuariosController.remove);

  app
    .route('/usuarios/login')
    .post(authentication.local, UsuariosController.login);
};
