var needle = require("needle");
var os   = require("os");
var fs = require("fs");

var config = {};
config.ssh_keys_id = process.env.DO_ACCESS_KEY_ID;
config.token = process.env.DO_ACCESS_KEY;

var headers =
{
	'Content-Type':'application/json',
	Authorization: 'Bearer ' + config.token
};

var client =
{

	createDroplet: function (dropletName, region, imageName, onResponse)
	{
		var data = 
		{
			"name": dropletName,
			"region":region,
			"size":"512mb",
			"image":imageName,
			// Id to ssh_key already associated with account.
			"ssh_keys":[config.ssh_keys_id],
			//"ssh_keys":null,
			"backups":false,
			"ipv6":false,
			"user_data":null,
			"private_networking":null
		};

		console.log("Attempting to create: "+ JSON.stringify(data) );

		needle.post("https://api.digitalocean.com/v2/droplets", data, {headers:headers,json:true}, onResponse );
	}
};

var name = "olivia-devops-hw1-droplet"
var region = "nyc3"; // Fill one in from #1
var image = "ubuntu-14-04-x32"; // Fill one in from #2
client.createDroplet(name, region, image, function(err, resp, body)
{
	var dropletId = body.droplet.id;
	console.log(body)
	//StatusCode 202 - Means server accepted request.
	if(!err && resp.statusCode == 202)
	{
		console.log( JSON.stringify( body, null, 3 ) );
		setTimeout(retrieveIp, 10000,dropletId,name);
	}
});
var retrieveIp = function(dropletId,hostname)
{
		needle.get("https://api.digitalocean.com/v2/droplets/"+dropletId, {headers:headers}, function(err,resp)
		{
			var dropletIp = resp.body.droplet.networks.v4[0].ip_address;
			console.log(dropletIp); 
			var record ='node1 ansible_ssh_host='+dropletIp+' ansible_ssh_user='+'root'+'\n';
			fs.appendFile("inventory",record, function(err) 
			{
				if(err) 
				{
					return console.log(err);
				}
				else
				{
					console.log("Successfully wrote droplet ip as node1 to inventory file");
				}
			});		
			// fs.appendFile("inventory/inventory", inventory, function(err) 
			// {
			// 	if (err) 
			// 	{
			// 		console.loge(err);
			// 	} 
			// 	else
			// 	{
			// 		console.log("Inventory file got appended successfully");
			// 	}
			// });

		});
};
