const Item = require('./models').Item;
const List = require('./models').List;

module.exports = {
  getAllListItems(id, callback) {
    return List.findById(id, {
      include: [{ all: true, nested: true }]
    })
      .then(list => {
        callback(null, list);
      })
      .catch(err => {
        callback(err);
      });
  },
  addItem(newItem, callback) {
    return Item.create(newItem)
      .then(item => {
        callback(null, item);
      })
      .catch(err => {
        callback(err);
      });
  },
  getItem(id, callback) {
    return Item.findById(id, {
      include: [{ all: true, nested: true }]
    })
      .then(item => {
        callback(null, item);
      })
      .catch(err => {
        callback(err);
      });
  },
  deleteItem(id, callback) {
    return Item.destroy({
      where: { id }
    })
      .then(deletedRecordsCount => {
        callback(null, deletedRecordsCount);
      })
      .catch(err => {
        callback(err);
      });
  },
  updateItem(id, updatedItem, callback) {
    return Item.findById(id, {
      include: [{ all: true, nested: true }]
    }).then(item => {
      if (!item) {
        return callback('Item not found');
      }

      item
        .update(updatedItem, {
          fields: Object.keys(updatedItem)
        })
        .then(() => {
          callback(null, item);
        })
        .catch(err => {
          callback(err);
        });
    });
  }
};
