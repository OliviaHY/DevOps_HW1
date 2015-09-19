var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs');


// AWS.config.region = 'us-east-1'
// AWS.config.maxRetries = 10
// AWS.config.apiVersion = 'latest'

AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey= process.env.AWS_ACCESS_KEY;

console.log('here');

var instanceParams = {
  	       region: 'us-east-1',
 	         apiVersion : 'latest',
 	         maxRetries : 20
}


var ec2 = new AWS.EC2(instanceParams);

console.log('here');

var properties = {
           ImageId: 'ami-1624987f', 
           KeyName: 'DevOps_hw1_ec2',
           InstanceType: 't1.micro', 
           MinCount: 1,
           MaxCount: 1
};

ec2.runInstances(properties,function(err,data)
{

  	if(err) 
  	{ 
		    console.log("Fail to create instance.", err); 
		    
        return;
  	}
  	console.log('here');
  	var instanceId = data.Instances[0].InstanceId;
  	console.log("Instance: "+instanceId+" created.");
  	response = {
                  instanceId: data.Instances[0].InstanceId,
                  user: 'ubuntu'
               }
    ec2.waitFor('instanceRunning',{ InstanceIds: [response.instanceId]},
		          function(err,data)
		          {
		          	if(err)
		          	{
			             console.log(err);
			             process.exit(1);
			         }
			         console.log('Getting instance ip..');
			         console.log(data.Reservations[0].Instances[0].PublicIpAddress);
			         var ec2Ip = data.Reservations[0].Instances[0].PublicIpAddress;	
			         var record ='node0 ansible_ssh_host='+ec2Ip+' ansible_ssh_user='+'ubuntu '+'ansible_ssh_private_key_file='+ '/vagrant/DevOps_hw1_ec2.pem'+'\n';           			
			         fs.writeFile("inventory", record, function(error) {
                	if (error) 
                	{
                        	console.log(err);
                	}
                	else
                	{
                        	console.log("The inventory file including ec2 ip as node0 saved.");
                	}
          		
              });

	});
});



