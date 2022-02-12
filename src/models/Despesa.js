class Despesa {
  id;

  descricao;

  valor;

  data;

  categoria;

  constructor(descricao, valor, data, categoria = 'Outras') {
    this.descricao = descricao;
    this.valor = valor;
    this.data = data;
    this.categoria = categoria;
  }
}

module.exports = Despesa;
