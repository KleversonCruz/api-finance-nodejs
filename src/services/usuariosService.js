const { ConflictError } = require('../errors');
const BaseServices = require('./baseServices');

class UsuariosService extends BaseServices {
  constructor() {
    super('Usuarios');
  }

  async checkIfUserExists(email) {
    const model = await super.getOne({ email });

    if (model) {
      throw new ConflictError('O usuário já existe!');
    }
  }
}

module.exports = UsuariosService;
