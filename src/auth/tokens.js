const jwt = require('jsonwebtoken');

function createJWT(id, [timeAmount, timeUnit]) {
  const payload = { id };
  const token = jwt.sign(payload, process.env.CHAVE_JWT, {
    expiresIn: timeAmount + timeUnit,
  });
  return token;
}

function verifyJWT(token) {
  const { id } = jwt.verify(token, process.env.CHAVE_JWT);
  return id;
}

module.exports = {
  access: {
    expires: [15, 'm'],
    create(id) {
      return createJWT(id, this.expires);
    },
    verify(token) {
      return verifyJWT(token);
    },
  },
};
