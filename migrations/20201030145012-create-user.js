'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        "type": Sequelize.STRING,
        "field": "name",
        "unique": false,
        "allowNull": false
      },
      surname: {
        "type": Sequelize.STRING,
        "field": "surname",
        "unique": false,
        "allowNull": false
      },
      password: {
        "type": Sequelize.STRING,
        "field": "password",
        "unique": false,
        "allowNull": false
      },
      birthday: {
        "type": Sequelize.DATE,
        "field": "birthday",
        "unique": false,
        "allowNull": false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};
