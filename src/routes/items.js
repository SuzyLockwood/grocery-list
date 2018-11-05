const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/lists/:id/items/create', itemController.create);
router.post('/lists/:listId/items/:id/destroy', itemController.destroy);
router.get('/lists/:listId/items/:id/edit', itemController.edit);
router.post('/lists/:listId/items/:id/update', itemController.update);

module.exports = router;
