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
    await queryInterface.bulkInsert('Reservations', [
      {
        id: '1',
        checkedin: '2020-12-01',
        checkedout: '2020-12-04',
        adult: 2,
        child: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        hotelId: 10,
      },
      {
        id: '2',
        checkedin: '2020-12-01',
        checkedout: '2020-12-04',
        adult: 3,
        child: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        hotelId: 11,
      },
      {
        id: '3',
        checkedin: '2020-12-01',
        checkedout: '2020-12-04',
        adult: 3,
        child: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
        hotelId: 12,
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
    return queryInterface.bulkDelete('Reservations', null, {});
  },
};
