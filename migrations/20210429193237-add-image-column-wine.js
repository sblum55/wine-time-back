'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('wines', 'image', Sequelize.STRING)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('wines', 'image', Sequelize.STRING)
  }
};
