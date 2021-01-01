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
        name: 'hoyongLee',
        password: '834005432bd23e438e2976d8b90e2b72da7179557a31ba2ebfad554b175d5f02', // pas
        salt: 'c984b4f9ff6b7f00',
        mobile: '010-1234-4444',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        loginId: 'ingi@code.com',
        name: 'ingiKim',
        password: '2f845697ad6c091395b300e705a1dcd41956618424f3b7cbc904ce0db6132e93', // nas
        salt: 'a201157d90a5606e',
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
