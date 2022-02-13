class UnauthorizedError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'Unauthorized';
  }
}

module.exports = UnauthorizedError;
