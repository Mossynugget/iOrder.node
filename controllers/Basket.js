var Global = require('../global');
var fs = require('fs');
var dateFormat = require('dateformat');

exports.basket_list = function(req, res){
	fs.readFile(Global.dataDir + "/Basket.json", "utf-8", function(err, data){
		if (err)
		{
			console.log(err);
			throw err;
		}
		res.send(data);
	});
};
exports.basket_add_item = function(req, res){
	fs.readFile(Global.dataDir + "/Basket.json", "utf-8", function(err, data){
		if (err)
		{
			console.log(err);
			throw err;
		}

		var basket_info = JSON.parse(data);
		var day = dateFormat(new Date(), "yyyy-mm-dd HH24:MM:ss");
		var product = getProduct(req.params.productId);

		if (!basket_info){
			product.quantity = 1;
			basket_info[req.params.orderId] =
			{
				order:
				{
					clientId: req.params.clientId,
					dateCreated: day,
					dateUpdated: day,
					complete: false
				}
			};
			basket_info[req.params.orderId].products[productId] = product;
		}
		else
		{
			var basket_item = basket_info[req.params.orderId];
			if (!basket_item)
			{
				basket_info[req.params.orderId] =
				{
					order:
					{
						clientId: req.params.clientId,
						dateCreated: day,
						dateUpdated: day,
						complete: false
					}
				};
				product.quantity = 1;
				basket_info[req.params.orderId].products[req.params.productId] = product;
			}
			else{
				if (basket_item.complete)
					throw "Order #" + req.params.orderId + " is complete. Please create a new order with a different order number.";


				var editProduct = basket_item.products[req.params.productId];
				
				if (!editProduct){
					editProduct = product;
					editProduct.quantity = 1;
				}
				else{
					editProduct.quantity++;
				}
				basket_item.products[req.params.productId] = editProduct;
				basket_item.order.dateUpdated = day;

				basket_info[req.params.orderId] = basket_item;
			}
		}
		fs.writeFile(Global.dataDir + "/Basket.json", JSON.stringify(basket_info, null, "\t"), function(err){
			if (err)
			{
				console.log(err);
				throw err;
			}
		});

		res.send(JSON.stringify(basket_info, null, "\t"));
	});
};
exports.basket_remove_item = function(req, res){
	fs.readFile(Global.dataDir + "/Basket.json", "utf-8", function(err, data){
		if (err)
		{
			console.log(err);
			throw err;
		}

		var basket_info = JSON.parse(data);
		var day = dateFormat(new Date(), "yyyy-mm-dd HH24:MM:ss");

		if (!basket_info)
			throw "No basket info recorded. Add an item first.";
		else
		{
			var basket_item = basket_info[req.params.orderId];
			if (!basket_item)
				throw "Order #" + req.params.orderId + " does not exist.";
			else{
				if (basket_item.complete)
					throw "Order #" + req.params.orderId + " is complete. Cannot remove items from a completed order.";


				var editProduct = basket_item.products[req.params.productId];
				
				if (!editProduct)
					throw "Order #" + req.params.orderId + " does not contain this product.";
				else
				{
					if (editProduct.quantity > 1){
						editProduct.quantity++;
						basket_item.products[req.params.productId] = editProduct;
					}
					else
					{
						delete basket_item.products[req.params.productId];
					}
				}
				basket_item.order.dateUpdated = day;
				basket_info[req.params.orderId] = basket_item;
			}
		}
		fs.writeFile(Global.dataDir + "/Basket.json", JSON.stringify(basket_info, null, "\t"), function(err){
			if (err)
			{
				console.log(err);
				throw err;
			}
		});

		res.send(JSON.stringify(basket_info, null, "\t"));
	});
};
exports.basket_complete = function(req, res){
	fs.readFile(Global.dataDir + "/Basket.json", "utf-8", function(err, data){
		if (err)
		{
			console.log(err);
			throw err;
		}

		var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
		var basket_info = JSON.parse(data);
		if (!basket_info)
			throw "No basket info recorded. Add an item first.";
		else
		{
			var basket_item = basket_info[req.params.orderId];
			if (!basket_item)
				throw "Order #" + req.params.orderId + " does not exist.";
			basket_item.order.comlete = true;
			basket_item.order.dateUpdated = day;
			basket_info[req.params.orderId] = basket_item;
		}

		fs.writeFile(Global.dataDir + "/Basket.json", JSON.stringify(basket_info, null, "\t"), function(err){
			if (err)
			{
				console.log(err);
				throw err;
			}
		});

		res.send(JSON.stringify(basket_info, null, "\t"));
	});
};
function getProduct(productId){
	fs.readFile(Global.dataDir + "/Product.json", "utf-8", function(err, data){
		if (err)
		{
			console.log(err);
			throw err;
		}
		var products = JSON.parse(data);
		if (!products)
			throw "No products available";
		var product = products[productId];
		if (!product)
			throw "Invalid product code: " + productId;
		return product;
	});
}
