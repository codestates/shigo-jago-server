'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Users', [
      {
        id: '2',
        loginId: 'ho@code.com',
        name: 'hoyong',
        password: 'pas',
        mobile: '010-1234-4444',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        loginId: 'ingi@code.com',
        name: 'ingiKim',
        password: 'pas',
        mobile: '010-1234-4444',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  },
};
