'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clients', [{
      clientName: 'John Doe',
      email: 'John@gmail.com',
      address: '2234 Street St, Al, 30123',
      phoneNumber: '444-222-3333',
      project: 'A',
      task: 'contact client',
      budget: 2000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
