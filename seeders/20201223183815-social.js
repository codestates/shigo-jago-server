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
    await queryInterface.bulkInsert('Socials', [
      {
        id: '10',
        corporation: 'kakao',
        socialEmail: 'hoyong@naver.com',
        socialAccount: '1518565481',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2
      },
      {
        id: '11',
        corporation: 'google',
        socialEmail: 'hoyong@gmail.com',
        socialAccount: '65165465465135135',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2
      },
      {
        id: '12',
        corporation: 'google',
        socialEmail: 'ingi@gmail.com',
        socialAccount: '75233258953528562',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3
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
    return queryInterface.bulkDelete('Socials', null, {});
  },
};
