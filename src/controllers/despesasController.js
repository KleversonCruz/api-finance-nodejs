const Despesa = require('../models/Despesa');
const { DespesasService } = require('../services');
const util = require('../util');

const despesasService = new DespesasService();

class DespesasController {
  static async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const despesa = await despesasService.checkIfIdExists(id);
      res.status(200).json(despesa);
    } catch (error) {
      next(error);
    }
  }

  static async getAllByDescricao(req, res, next) {
    const { descricao } = req.query;

    try {
      const despesas = await despesasService.getAllByDescricao(descricao);
      res.status(200).json(despesas);
    } catch (error) {
      next(error);
    }
  }

  static async getAllByDate(req, res, next) {
    const { ano, mes } = req.params;
    const date = new Date(`${ano}-${mes}`);
    const { firstDay, lastDay } = util.getFirstAndLastDayInMonth(date);

    try {
      const despesas = await despesasService.getAllByDate(firstDay, lastDay);
      res.status(200).json(despesas);
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    const { descricao, valor, data, categoria } = req.body;
    const despesa = new Despesa(descricao, valor, data, categoria);

    try {
      await despesasService.checkIfExistsInDate(descricao, data);

      const novaDespesa = await despesasService.create(despesa);
      res.status(201).json(novaDespesa);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const { descricao, valor, data, categoria } = req.body;

    try {
      const despesa = new Despesa(descricao, valor, data, categoria);
      await despesasService.updateIfIdExists(id, despesa);
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    const { id } = req.params;

    try {
      await despesasService.destroy(id);
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DespesasController;
