const itemQueries = require('../db/queries.items.js');

module.exports = {
  index(req, res, next) {
    itemQueries.getAllListItems(req.params.id, (err, list) => {
      if (err || list == null) {
        res.redirect(404, '/');
      } else {
        res.render('items/index', { list });
      }
    });
  },
  create(req, res, next) {
    let newItem = {
      name: req.body.name,
      completed: false,
      listId: req.params.id
    };
    // if (req.user) {
    itemQueries.addItem(newItem, (err, item) => {
      if (err) {
        req.flash('error', err);
      }
    });
    // } else {
    //   req.flash('notice', 'You must be signed in to do that.');
    // }
    res.redirect(req.headers.referer);
  },
  destroy(req, res, next) {
    itemQueries.deleteItem(req.params.id, (err, deletedRecordsCount) => {
      if (err) {
        req.flash('error', err);
      }
    });
    res.redirect(req.headers.referer);
  },
  edit(req, res, next) {
    itemQueries.getItem(req.params.id, (err, item) => {
      if (err || item == null) {
        res.redirect(404, '/');
        console.log(err);
      } else {
        res.render('items/edit', { item });
      }
    });
  },
  update(req, res, next) {
    itemQueries.updateItem(req.params.id, req.body, (err, item) => {
      if (err || item == null) {
        res.redirect(
          404,
          `/lists/${req.params.listId}/items/${req.params.id}/edit`
        );
      } else {
        res.redirect(303, `/lists/${req.params.listId}`);
      }
    });
  }
};
