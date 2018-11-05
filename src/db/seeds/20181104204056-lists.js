'use strict';
let lists = [
  {
    title: 'Week One Grocery List',
    description: 'Generic week 1 of the month grocery list.',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1
  },
  {
    title: 'Week Two Grocery List',
    description: 'Generic week 2 of the month grocery list.',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1
  },
  {
    title: 'Week Three Grocery List',
    description: 'Generic week 3 of the month grocery list.',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 3
  },
  {
    title: 'Week Four Grocery List',
    description: 'Generic week 4 of the month grocery list.',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 5
  }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Lists', lists, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Lists', null, {});
  }
};
