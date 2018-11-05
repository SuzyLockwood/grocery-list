'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define(
    'Item',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      listId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Item.associate = function(models) {
    Item.belongsTo(models.List, {
      foreignKey: 'listId',
      onDelete: 'CASCADE'
    });
  };
  return Item;
};
