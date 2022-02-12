class InvalidArgumentError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'Bad Request';
  }
}

module.exports = InvalidArgumentError;
