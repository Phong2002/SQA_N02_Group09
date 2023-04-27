'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },

      lastName: {
        type: Sequelize.STRING
      },

      birthDay: {
        type: Sequelize.DATEONLY
      },

      email: {
        type: Sequelize.STRING
      },

      password: {
        type: Sequelize.STRING
      },

      address: {
        type: Sequelize.STRING
      },

      cccd: {
        type: Sequelize.STRING
      },

      avatar: {
        type: Sequelize.STRING
      },

      role_code: {
        type: Sequelize.STRING,
        // defaultValue: 'R3'
      },

      phoneNumber: {
        type: Sequelize.STRING
      },

      gender: {
        type: Sequelize.STRING
      },

      // reset_password_token: {
      //   type: Sequelize.STRING
      // },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};