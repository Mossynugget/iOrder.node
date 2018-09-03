var Global = require('../global');
var fs = require('fs');

exports.client_list = function(req, res){
	fs.readFile(Global.dataDir + "/Client.json", "utf-8", function(err, data){
		if (err)
		{
			console.log(err);
			return;
		}
		console.log(data);
		res.send(data);
	});
};
exports.client_get = function(req, res){
	fs.readFile(Global.dataDir + "/Client.json", "utf-8", function(err, data){
		if (err)
		{
			console.log(err);
			throw err;
		}
		var clients = JSON.parse(data);
		var client = clients[req.params.id];
		res.send(JSON.stringify(client, null, "\t"));
	});
};
exports.client_save = function(req, res){
	var query = req.params;
	fs.readFile(Global.dataDir + "/Client.json", "utf-8", function(err, data){
		if (err)
		{
			console.log(err);
			throw err;
		}
		var clients = JSON.parse(data);

		var id = query.id;
		var client = clients[id];
		if (client){
			client.firstName = query.firstName;
			client.surname = query.surname;
			client.addressType = query.addressType;
			client.streetAddress = query.streetAddress;
			client.suburb = query.suburb;
			client.city = query.city;
			client.postalCode = query.postalCode;
		}
		else{
			client =
			{
				firstName: query.firstName,
				surname: query.surname,
				addressType: query.addressType,
				streetAddress: query.streetAddress,
				suburb: query.suburb,
				city: query.city,
				postalCode: query.postalCode
			};
		}
		clients[id] = client;
		fs.writeFile(Global.dataDir + "/Client.json", JSON.stringify(clients, null, "\t"), function(err){
			if (err)
			{
				console.log(err);
				throw err;
			}
		});

		res.send(JSON.stringify(clients, null, "\t"));
	});
};
exports.client_delete = function(req, res){
	fs.readFile(Global.dataDir + "/Client.json", "utf-8", function(err, data){
		if (err)
		{
			console.log(err);
			throw err;
		}
		var clients = JSON.parse(data);
		var client = clients[req.params.id];
		if (client)
		{
			console.log("Deleting client:\r\n" + JSON.stringify(client, null, "\t"));

			delete clients[req.params.id];
			
			fs.writeFile(Global.dataDir + "/Client.json", JSON.stringify(clients, null, "\t"), function(err){
				if (err)
				{
					console.log(err);
					throw err;
				}
			});
		}

		res.send(JSON.stringify(clients, null, "\t"));
	});
};

