

# Overview

LBApp is an interface for Lightbase database for end users. This interface offer options to manager databases and reports for all user data. 

![Lightbase Bases](https://dl.dropboxusercontent.com/u/6061429/lightbase-docs/89056015.png)




## Changes Log

## v0.1-beta  (2015-04-01)

Workarounds:

  - user authentication interface
  - new interface for database creator
  - options to share database with other users
  - templates system

Bugfixes:

  - fix errors in explorer.js 

## v0.1-alpha  (2015-04-01)

Workarounds:

  - the first version to visualize and create lightbase database 


## Quick Start

To start using LBApp, you have to install in your virtualenv with python 3+. 


```bash
$ source /path/to/virtualenv/bin/activate
```

```bash
$ pip install -r requirements.txt
```


```bash
$ python setup.py develop
```

Then, you can copy the development.ini-dist 

```bash
$ cp development.ini-dist develpment.ini 
```

And edit the following parameters

```bash
rest_url = http://127.0.0.1/api        # URL for your lightbase instance 
lbgenerator.token_key = 0              # set the lightbase install api_key
lbgenerator.token_name = api_key       #
auth.enabled = 1                       # set 1 if you need user authentication 
link_lightbase=http://lightbaseapp.herokuapp.com        # set your domain here
```


Finally, start the server

```bash
$ pserve develpment.ini 
```


## Demos

 - [Instance on Heroku](http://lightbaseapp.herokuapp.com)


## Community

* Access our community in Software Público Brasileiro [Software Público Brasileiro](https://portal.softwarepublico.gov.br/social/lightbase/) (pt_BR)
* Have a question that's not a feature request or bug report? [Discuss on the Ionic Forum](http://forum.ionicframework.com/)
* Read our [Blog](http://lightbase.com.br/) (pt_BR)


## LICENSE

Ionic is licensed under the GNU GENERAL PUBLIC LICENSE Version 2. For more information, see the LICENSE file in this repository.

