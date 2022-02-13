'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Usuarios', [
      {
        nome: 'Dev',
        email: 'dev@test.com',
        senha: await bcrypt.hash('123456', 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Usuarios', null, {});
  },
};
