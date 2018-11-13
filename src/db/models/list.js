'use strict';
module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define(
    'List',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  List.associate = function(models) {
    List.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    List.hasMany(models.Item, {
      foreignKey: 'listId',
      as: 'items'
    });
  };
  //so that I can add lists to user profile
  List.addScope('userLists', userId => {
    return {
      where: { userId: userId },
      order: [['createdAt', 'DESC']]
    };
  });
  return List;
};
