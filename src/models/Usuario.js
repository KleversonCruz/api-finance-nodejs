const bcrypt = require('bcrypt');

class Usuario {
  id;

  nome;

  email;

  senha;

  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  async createPasswordHash() {
    const hashCost = 12;
    this.senha = await bcrypt.hash(this.senha, hashCost);
    return this.senha;
  }
}

module.exports = Usuario;
