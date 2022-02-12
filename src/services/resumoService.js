const BaseServices = require('./baseServices');
const DespesaService = require('./despesasService');
const ReceitasService = require('./receitasService');

class ResumoServices extends BaseServices {
  constructor() {
    super('Resumo');
    this.despesas = new DespesaService('Despesas');
    this.receitas = new ReceitasService('Receitas');
  }

  async getResumoByDate(ano, mes) {
    const { total: valorDespesas } = await this.despesas.getSumByDate(ano, mes);
    const { total: valorReceitas } = await this.receitas.getSumByDate(ano, mes);

    const despesasPorCategoria = await this.despesas.getSumByDateGroupByCategoria(ano, mes);

    return {
      valorDespesas,
      valorReceitas,
      valorSaldo: valorReceitas - valorDespesas,
      despesasPorCategoria,
    };
  }
}

module.exports = ResumoServices;
