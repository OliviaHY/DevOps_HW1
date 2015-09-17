###Introduction
Following steps below, I was able to:   
1. Provision two server: ec2 and droplet;    
2. Automatically generate inventory file for both;   
3. Ping both servers and install nginx in droplet.   
4. Used npm for node.js    
Please contact me if you have any questions:    
name: Ying(Olivia) Huang;
email: yhuang34@ncsu.edu

###Steps
1. (** provisioning two servers: ec2 and droplet**)     
     Create droplet in digitalocean: hw1-server1
     ![Droplet](droplet.png)
    Create EC2 in aws. 
     ![ec2](ec2.png)
    Create secured group for ec2 and add policy:
    ![Policy](policy.png)
2. create vagrant vm 
3. install ansible (workshop1) in vagrant,enter vagrant 
4. use command `ssh-keygen -t rsa -C "oliviahyacinth@gmail.com"`
generate do.pub (public key) and do (private key)
    create key pairs (aws.gem->private key) in aws network and sercurity on the left
    rename do into do.gem`mv`
5. use comman`cp -r ~/.ssh/DevOps/ .` move all private keys (do.gem and aws.gem) to vagrant directory (DevOps_HW1), then can see them in the /vagrant folder in virtual box (VB).
6. enter vagrant, get digital_ocean.py also .int and ec2.py also .int (to automatically pull inventory) from [https://github.com/ansible/ansible/tree/devel/contrib](https://github.com/ansible/ansible/tree/devel/contrib) put into vagrant vm ~ directory
7. generate api_token in for droplet then put it into ‘api_token =’ in digital_ocean.ini
8. get the key and key id from ec2, then do `export AWS_ACCESS_KEY_ID='AKIAIMFRTHC76N6YE4FQ'` `export AWS_SECRET_ACCESS_KEY='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'` 
9. `eval "$(ssh-agent -s)"`+`ssh-add /vagrant/do.pem`+`ssh-add /vagrant/aws.pem`+`chmod 400 aws.pem`+`chmod 400 do.pem`to let ssh-agent do ssh to ec2 and droplet on my behave
10. `sudo pip install dopy` add dopy module for following python scripts
11. use `chmod +x digital_ocean.py ` ` chmod +x ec2.py` change authrozation of .py
12. `python digital_ocean.py --list` `python ec2.py --list` get host and ip from droplet
13. write two playbooks: 
**playbooks to install nginx **)      
  *i. ec2:*   
  hosts: us-east-1   
  remote_user: ubuntu   
  tasks:   
  	name: to test is it possible to ping ec2 server   
  ping:            
 
     *ii. droplet:*  
  hosts: hw1-server1   
  remote_user: root   
  tasks:   
  name: to test is it possible to ping the droplet server   
  ping:    
  name: install nginx   
  apt: pkg=nginx state=installed update_cache=true   

14. put all python scripts that were used to get inventory into ~/scripts
15.  run playbook `ansible-playbook ec2-playbook.yml -i scripts/ec2.py` `ansible-playbook droplet-playbook.yml -i scripts/digital_ocean.py`
16.  install node.js and npm    `sudo apt-get update`  `sudo apt-get install nodejs`  `sudo apt-get install npm`(**configuration management**)
17.  write olivia_reachSky.js to run python scripts and generate actual inventory file
18.  run olivia_reachSky.js by `nodejs olivia_reachSky.js` (have to run previous steps before this) (**automatically generate inventory**)    
###Results
![result](hw2.gif))

