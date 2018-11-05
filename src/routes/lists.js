const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const validation = require('./validation');
const helper = require('../auth/helpers');

router.get('/lists', listController.index);
router.get('/lists/new', listController.new);
router.post(
  '/lists/create',
  helper.ensureAuthenticated,
  validation.validateLists,
  listController.create
);
router.get('/lists/:id', listController.show);
router.post('/lists/:id/destroy', listController.destroy);
router.get('/lists/:id/edit', listController.edit);
router.post(
  '/lists/:id/update',
  validation.validateLists,
  listController.update
);

module.exports = router;
