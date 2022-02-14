const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Despesas extends Model {
    static associate(models) {}
  }
  Despesas.init(
    {
      descricao: DataTypes.STRING,
      valor: DataTypes.NUMERIC,
      data: DataTypes.DATEONLY,
      categoria: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Despesas',
    },
  );
  return Despesas;
};
