const {Router} = require('express');
const router = Router()
const controller = require('../Controllers/Products.controllers');

router.post('/search', controller.search);
// router.post('/item/create', controller.createItem);
//
// router.get('/list/getAll', controller.getAllLists);
// router.get('/getOwnerLists/:id', controller.getOwnerLists);
// router.get('/getListById/:id', controller.getListById);
// router.get('/item/getItems/:id', controller.getItems);
// router.get('/item/getAllItems', controller.getAllItems);
//
// router.patch('/list/updateList/:id', controller.updateList);
// router.patch('/item/updateItem/:id', controller.updateItem);
//
// router.delete('/list/remove/:id', controller.removeList);
// router.delete('/item/remove/:id', controller.removeItem);

module.exports = router;