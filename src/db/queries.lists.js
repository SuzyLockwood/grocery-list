const List = require('./models').List;
const Item = require('./models').Item;
const User = require('./models').User;
const Authorizer = require('../policies/application');

module.exports = {
  getAllLists(callback) {
    return List.all()
      .then(lists => {
        callback(null, lists);
      })
      .catch(err => {
        callback(err);
      });
  },
  getList(id, callback) {
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
  addList(newList, callback) {
    return List.create(newList)
      .then(list => {
        callback(null, list);
      })
      .catch(err => {
        callback(err);
      });
  },
  deleteList(req, callback) {
    return List.findById(req.params.id)
      .then(list => {
        const authorized = new Authorizer(req.user, list).destroy();
        if (authorized) {
          list.destroy().then(res => {
            callback(null, list);
          });
        } else {
          req.flash('error', 'You are not authorized to do that.');
          callback(401);
        }
      })
      .catch(err => {
        callback(err);
      });
  },
  updateList(req, updatedList, callback) {
    return List.findById(req.params.id).then(list => {
      if (!list) {
        return callback('List not found');
      }
      const authorized = new Authorizer(req.user, list).update();
      if (authorized) {
        list
          .update(updatedList, {
            fields: Object.keys(updatedList)
          })
          .then(() => {
            callback(null, list);
          })
          .catch(err => {
            callback(err);
          });
      } else {
        req.flash('error', 'You are not authorized to do that.');
        callback('Forbidden');
      }
    });
  }
};
