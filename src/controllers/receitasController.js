const Receita = require('../models/Receita');
const { ReceitasService } = require('../services');
const util = require('../util');

const receitasService = new ReceitasService();

class receitasController {
  static async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const despesa = await receitasService.checkIfIdExists(id);
      res.status(200).json(despesa);
    } catch (error) {
      next(error);
    }
  }

  static async getAllByDescricao(req, res, next) {
    const { descricao } = req.query;

    try {
      const receitas = await receitasService.getAllByDescricao(descricao);
      res.status(200).json(receitas);
    } catch (error) {
      next(error);
    }
  }

  static async getAllByDate(req, res, next) {
    const { ano, mes } = req.params;
    const date = new Date(`${ano}-${mes}`);
    const { firstDay, lastDay } = util.getFirstAndLastDayInMonth(date);

    try {
      const receitas = await receitasService.getAllByDate(firstDay, lastDay);
      res.status(200).json(receitas);
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    const { descricao, valor, data } = req.body;
    const despesa = new Receita(descricao, valor, data);

    try {
      const novaReceita = await receitasService.create(despesa);
      res.status(201).json(novaReceita);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const { descricao, valor, data } = req.body;

    try {
      const despesa = new Receita(descricao, valor, data);
      await receitasService.update(id, despesa);
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    const { id } = req.params;

    try {
      await receitasService.destroy(id);
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = receitasController;
