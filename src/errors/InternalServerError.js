class InternalServerError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'Internal Server Error';
  }
}

module.exports = InternalServerError;
