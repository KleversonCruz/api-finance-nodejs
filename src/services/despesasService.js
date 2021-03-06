const { Op } = require('sequelize');
const sequelize = require('sequelize');
const db = require('./sequelize/models');
const BaseServices = require('./baseServices');
const util = require('../util');

class DespesaService extends BaseServices {
  constructor() {
    super('Despesas');
  }

  async getAllByDescricao(descricao) {
    const where = {};
    if (descricao) {
      where.descricao = { [Op.like]: descricao };
    }

    return db[this.modelName].findAll({
      where: { ...where },
      raw: true,
    });
  }

  async getSumByDate(ano, mes) {
    const date = new Date(`${ano}-${mes}`);
    const { firstDay, lastDay } = util.getFirstAndLastDayInMonth(date);

    return db[this.modelName].findOne({
      attributes: [[sequelize.fn('sum', sequelize.col('valor')), 'total']],
      where: {
        data: {
          [Op.gte]: firstDay,
          [Op.lte]: lastDay,
        },
      },
      raw: true,
    });
  }

  async getSumByDateGroupByCategoria(ano, mes) {
    const date = new Date(`${ano}-${mes}`);
    const { firstDay, lastDay } = util.getFirstAndLastDayInMonth(date);

    return db[this.modelName].findAll({
      attributes: [
        'categoria',
        [sequelize.fn('sum', sequelize.col('valor')), 'total'],
      ],
      group: ['Despesas.categoria'],
      where: {
        data: {
          [Op.gte]: firstDay,
          [Op.lte]: lastDay,
        },
      },
      raw: true,
    });
  }

  async updateIfIdExists(id, modelData, transaction = {}) {
    const currentData = await this.checkIfIdExists(id);

    if (currentData.descricao !== modelData.descricao) {
      await this.checkIfExistsInDate(modelData.descricao, modelData.data);
    }

    return db[this.modelName].update(modelData, { where: { id } }, transaction);
  }
}

module.exports = DespesaService;
