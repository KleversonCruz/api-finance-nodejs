class Receita {
  id;

  descricao;

  valor;

  data;

  constructor(descricao, valor, data) {
    this.descricao = descricao;
    this.valor = valor;
    this.data = data;
  }
}

module.exports = Receita;
