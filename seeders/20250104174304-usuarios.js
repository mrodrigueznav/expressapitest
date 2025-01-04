'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    for (let i = 1; i <= 50; i++) {
      users.push({
        nombre: `Usuario${i}`,
        correo: `usuario${i}@ejemplo.com`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Usuarios', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};