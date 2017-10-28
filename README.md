# spring-cloud-demo

Demo showing how to deploy spring-cloud solution in docker swarm 

# Features

This demo will deploy the spring-cloud sample project at [https://github.com/chen0040/spring-erp-clients](https://github.com/chen0040/spring-erp-clients) at a single computer, which is specified as the development environment in the devops/ansible/erp.inventory.development. To deploy the solution across multiple computers or deploy it on a production environment, simply update the erp.inventory.development or erp.inventory.production

# Prerequisites

The ansible solution assumes that you are using linux operating system (in particular CentOS), if you are using Windows, you can cd to the project root directory and run the following environment to create a CentOS vm (at 192.168.10.13 as specified by Vagrant.config.yml) using Vagrant:

```bash
vagrant up
```

Once you have the CentOS system, you must ensure that the machine has Java 8 and Ansible installed. If not, you can run the following script to install these tools:

```bash
devops/sbin/env_setup.sh
```

# Install spring-cloud cluster

Once git clone this project on the CentOS environment or started a CentOS Vagrant VM on Windows, cd to the project root folder and run the following command to start installing the spring-cloud cluster jars:

```bash
cd devops/ansible
ansible-playbook install-erp.yml -u root -i erp.inventory.development
```

# Start spring-cloud cluster

Now to start the spring-cloud cluster, run the following command:


```bash
cd devops/ansible
ansible-playbook start-erp.yml -u root -i erp.inventory.development
```

At this point, the spring cluster will be running with the following micro-services:

* spring-erp-vendor: http://localhost:9024
* spring-erp-buyer: http://localhost:9020
* spring-erp-admin: http://localhost:9028
* spring-erp-scala: http://localhost:9022
* spring-erp-syslog4j-server: http://localhost:6088
* spring-eureka-server: http://localhost:8761

# Test the spring-cloud cluster

To test whether the system is running,run the following command:

```bash
curl http://localhost:9020/greetings
```

# Test the spring-cloud cluster using angular 

You can also test whether the system is running by starting the angular server using the following command:

```bash
sudo yum install -y nodejs
sudo npm install -g @angular/cli
cd devops/ng4-erp
npm install
ng serve --proxy-config proxy.conf.json --host 0.0.0.0 --disable-host-check --port 8080
```

This time navigate to http://localhost:8080 in your host computer's web browser

By the way, if you are using a Vagrant CentOS on Windows, then the last line of command should become:

```bash
ng serve --proxy-config proxy.conf.vagrant.json --host 192.168.10.13 --disable-host-check --port 8080
```

This time navigate to http://192.168.10.13:8080 in your host computer's web browser

# Stop spring-cloud cluster

To stop the spring-cloud cluster,run the following command:

```bash
cd devops/ansible
ansible-playbook stop-erp.yml -u root -i erp.inventory.development
```








