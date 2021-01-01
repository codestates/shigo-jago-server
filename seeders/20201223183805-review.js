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
    await queryInterface.bulkInsert('Reviews', [
      {
        id: '10',
        title: '이 호텔 좋아요',
        description: '추천합니다!!',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        hotelId: 10,
      },
      {
        id: '11',
        title: '이 호텔은 좀..',
        description: '불친절합니다.',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        hotelId: 11,
      },
      {
        id: '12',
        title: '호텔이 역이랑 가깝습니다.',
        description: '교통편리!',
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
    return queryInterface.bulkDelete('Reviews', null, {});
  },
};
