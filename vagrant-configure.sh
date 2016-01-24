#!/usr/bin/env bash

# Get root up in here
sudo su

# Just a simple way of checking if we need to install everything
if [ ! -d "/var/www" ]
then
    # Add MongoDB to apt
    apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
    echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/10gen.list

    # Update and begin installing some utility tools
    apt-get -y update
    apt-get install -y python-software-properties
    apt-get install -y git subversion curl
    apt-get install -y memcached build-essential

    # Add nodejs repo
    add-apt-repository -y ppa:chris-lea/node.js
    apt-get -y update

    # Install nodejs
    apt-get install -y nodejs

    # Install latest stable version of MongoDB
    apt-get install -y mongodb-10gen

    apt-get install -y nginx

    #copy stuff
    cp /www/packs-nginx.config /etc/nginx/sites-available/packs
    ln /etc/nginx/sites-available/packs /etc/nginx/sites-enabled/packs

    #install pm2
    npm install pm2 -g

    # Run it
    cd /www
    npm install
    pm2 start pm2.json --watch

    #start proxy
    service nginx start

    echo "Server should be listening on http://10.0.33.34/"
fi