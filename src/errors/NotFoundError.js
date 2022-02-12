class NotFoundError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'Not Found';
  }
}

module.exports = NotFoundError;
