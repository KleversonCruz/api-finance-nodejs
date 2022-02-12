class ConflictError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'Conflict';
  }
}

module.exports = ConflictError;
