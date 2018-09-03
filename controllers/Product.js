var Global = require('../global');
var fs = require('fs');

exports.product_list = function(req, res){
	fs.readFile(Global.dataDir + "/Product.json", "utf-8", function(err, data){
		if (err)
		{
			console.log(err);
			throw err;
		}
		console.log(data);
		res.send(data);
	});
};
