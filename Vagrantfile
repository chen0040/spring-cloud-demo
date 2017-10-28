# -*- mode: ruby -*# vi: set ft=ruby :
require 'yaml'
vagrantConfig = YAML.load_file 'Vagrantfile.config.yml'
Vagrant.configure("2") do |config|
    config.vm.box = "bento/centos-7.4"

    config.vm.define "erp" do |erp|
        erp.vm.network "private_network", ip: vagrantConfig['ip']
        erp.vm.hostname = "erp"
    end

    config.vm.synced_folder "devops/", "/home/vagrant/devops", owner:"vagrant", group: "vagrant"

    # VirtualBox specific settings
    config.vm.provider "virtualbox" do |vb|
		vb.gui = false
		vb.memory = "4096"
		vb.cpus = 2
    end

    config.vm.provision "shell", inline: "sudo yum update -y"
    config.vm.provision "shell", inline: "sudo yum upgrade -y"
	config.vm.provision "shell", inline: "sudo yum groupinstall \"Development tools\" -y"
	
	# Install java and ansible
	config.vm.provision "shell", inline: "sudo yum install -y java-1.8.0-openjdk-devel"
	config.vm.provision "shell", inline: "sudo yum install -y epel-release"
	config.vm.provision "shell", inline: "sudo yum install -y ansible"
	
		
end
