const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Receitas extends Model {
    static associate(models) {}
  }
  Receitas.init(
    {
      descricao: DataTypes.STRING,
      valor: DataTypes.NUMBER,
      data: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'Receitas',
    },
  );
  return Receitas;
};
