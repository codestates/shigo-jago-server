'use strict';

const { SourceCode } = require("eslint");

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
    await queryInterface.bulkInsert('Inquires', [
      {
        id: 1,
        email: 'abc@code.com',
        name: 'abc',
        subject: '환불관련',
        message: '개인사정으로 예약을 취소합니다.',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
      {
        id: 2,
        email: 'abcd@code.com',
        name: 'abcd',
        subject: '부정확한 가격 정보를 발견했습니다.',
        message: '사이트 표시금액과 결제금액이 다릅니다 확인 부탁드립니다.',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Inquires', 'userId');
  }
};
