var Global = require('../global');
var express = require('express');
var router = express.Router();

var client = require('../controllers/Client');
var product = require('../controllers/Product');
var basket = require('../controllers/Basket');

//CLIENT
router.get('/', client.client_list);
router.get('/client/:id', client.client_get);
router.post(Global.clientSaveUrl, client.client_save);
router.delete(Global.clientDeleteUrl, client.client_delete);
//PRODUCT
router.get('/product', product.product_list);
//BASKET
router.get('/basket', basket.basket_list);
router.post(Global.basketAddItemUrl, basket.basket_add_item);
router.post(Global.basketCompleteUrl, basket.basket_complete);
router.delete(Global.basketRemoveItemUrl, basket.basket_remove_item);


module.exports = router;
