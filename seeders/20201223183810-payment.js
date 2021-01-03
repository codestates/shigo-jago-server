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
    await queryInterface.bulkInsert('Payments', [
      {
        id: '3',
        price: '120000',
        howPaid: 'card',
        cardNumber: '1111-4444-3666-5455',
        accountNumber: null,
        company: '삼성카드',
        createdAt: new Date(),
        updatedAt: new Date(),
        reservationId: 1
      },
      {
        id: '4',
        price: '240000',
        howPaid: 'account',
        cardNumber: null,
        company: '신한은행',
        accountNumber: '356-516545-65412',
        createdAt: new Date(),
        updatedAt: new Date(),
        reservationId: 2
      },
      {
        id: '5',
        price: '360000',
        howPaid: 'account',
        cardNumber: null,
        company: '국민은행',
        accountNumber: '351-028461-77513',
        createdAt: new Date(),
        updatedAt: new Date(),
        reservationId: 3
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
    return queryInterface.bulkDelete('Payments', null, {});
  },
};
