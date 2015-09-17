var exec = require('child_process').exec,
    child1;
child1 = exec('python scripts/digital_ocean.py --list',
  function (error, stdout, stderr) {
    var fs = require('fs');
  	fs.writeFile("inventory_droplet",stdout, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The inventory file for droplet was saved!");
});
    console.log('----------------inventory of my droplet server-----------------');
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
var exec = require('child_process').exec,
    child2;

child2 = exec('python scripts/ec2.py --list',
  function (error, stdout, stderr) {
    var fs = require('fs');
  	fs.writeFile("inventory_ec2",stdout, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The inventory file for ec2 was saved!");
});
    console.log('-------------------inventory of my ec2 server-------------------'); 
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});

