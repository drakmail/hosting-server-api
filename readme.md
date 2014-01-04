# Delta Hosting Server API

![screenshot](https://raw.github.com/drakmail/hosting-server-api/master/docs/screenshot.png)

*// Screenshot of web status page*

## What is it?

It is a universal RESTful API server for a server management. I'm hope it will be:

* Manage:
  * Hosting user accounts
  * Databases
  * Server software
  * User sites:
    * Rails sites
    * Django sites
    * PHP sites
    * Any other sites
* Have:
  * CLI client
  * Web client

It is based on ActionHero (https://github.com/evantahler/actionHero) multi-transport API Server framework.

## How I can use it?

At this moment I'm couldn't provide full documentation, but it very self explaining:

```bash
$ git clone git@github.com:drakmail/hosting-server-api.git
$ cd hosting-server-api
$ npm install
$ # wait...
$ ./node_modules/actionHero/bin/actionHero start
$ # open your browser at 127.0.0.1:8080
```

## Contributing

* Fork it
* Make changes
* Create pull request with simple description
* Pray and hope :)

## LICENSE

GNU GPLv3

## Authors

* Delta Zet llc.
* Alexander Maslov (drakmail)
