const Usuario = require('../models/Usuario');
const { UsuariosService } = require('../services');

const tokens = require('../auth/tokens');

const usuarioService = new UsuariosService();

class UsuariosController {
  static async getAll(req, res, next) {
    try {
      const usuarios = await usuarioService.getAll();
      res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    const { nome, email, senha } = req.body;
    const usuario = new Usuario(nome, email, senha);

    try {
      await usuarioService.checkIfUserExists(email);

      await usuario.createPasswordHash();
      const novoUsuario = await usuarioService.create(usuario);
      res.status(201).json(novoUsuario);
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    const { id } = req.params;

    try {
      await usuarioService.destroy(id);
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  }

  static login(req, res, next) {
    try {
      const token = tokens.access.create(req.user.id);
      res.set('Authorization', token);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsuariosController;
