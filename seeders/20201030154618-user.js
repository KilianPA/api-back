'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = 'password'
    const birthday = new Date(1997, 6, 1)
    await queryInterface.bulkInsert('user', [{
      name: 'admin',
      surname: 'admin',
      password: password,
      birthday: birthday,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user', null, {});
  }
};
