'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.createTable('zebpay', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },

        buy: {
          type: Sequelize.INTEGER
        },

        sell: {
          type: Sequelize.INTEGER
        },
          timestamp: {
              allowNull: false,
              type: Sequelize.BIGINT,
              defaultValue: new Date().getTime()
          },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now')
        },
          deletedAt: {
              allowNull: true,
              type: Sequelize.DATE,
              defaultValue: null
          }
      });
  },

  down: function (queryInterface, Sequelize) {

      return queryInterface.dropTable('btcindia');
  }
};
