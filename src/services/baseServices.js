const { Op } = require('sequelize');
const { NotFoundError, ConflictError } = require('../errors');
const util = require('../util');
const db = require('./sequelize/models');

class BaseServices {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async getAll(where = {}) {
    return db[this.modelName].findAll({ where: { ...where }, raw: true });
  }

  async getOne(where = {}) {
    return db[this.modelName].findOne({ where: { ...where }, raw: true });
  }

  async create(modelData) {
    await this.checkIfExistsInDate(modelData.descricao, modelData.data);

    return db[this.modelName].create(modelData);
  }

  async update(id, modelData, transaction = {}) {
    const currentData = await this.checkIfIdExists(id);

    if (currentData.descricao !== modelData.descricao) {
      await this.checkIfExistsInDate(modelData.descricao, modelData.data);
    }

    return db[this.modelName].update(modelData, { where: { id } }, transaction);
  }

  async destroy(id) {
    await this.checkIfIdExists(id);

    return db[this.modelName].destroy({ where: { id } });
  }

  async restore(id) {
    return db[this.modelName].restore({ where: { id } });
  }

  async checkIfIdExists(id) {
    const model = await this.getOne({ id });

    if (!model) {
      throw new NotFoundError(
        `Não foi encontrado ${this.modelName} com o id especificado`,
      );
    }

    return model;
  }

  async getAllByDate(initialDate, finalDate) {
    return this.getAll({
      data: {
        [Op.gte]: initialDate,
        [Op.lte]: finalDate,
      },
    });
  }

  async checkIfExistsInDate(descricao, data) {
    const date = new Date(data);
    const { firstDay, lastDay } = util.getFirstAndLastDayInMonth(date);

    const model = await this.getOne({
      descricao,
      data: {
        [Op.gte]: firstDay,
        [Op.lte]: lastDay,
      },
    });

    if (model) {
      throw new ConflictError(
        'Já existe um registro com mesmo nome no mês informado',
      );
    }

    return model;
  }
}

module.exports = BaseServices;
