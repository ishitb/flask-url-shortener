<p align="center"><img src="https://socialify.git.ci/ishitb/flask-url-shortener/image?description=1&font=Raleway&owner=1&pattern=Floating%20Cogs&theme=Dark" alt="furls" width="640" height="320" /></p>

<h1 align="center">
   💻 FURLS
</h1>

<p align="center">
  FURLS API is an open source backend that can be deployed to any infrastructure that can run Node.js.
</p>

<br>
<br>

<p align="center">
    <a href="https://github.com/ishitb"><img alt="Maintainer" src="https://img.shields.io/badge/maintainer-IshitBeswal-blue"></a>
</p>

<p align="center">
    <a href="http://furls.herokuapp.com"><img alt="Website Demo" src="https://img.shields.io/website-up-down-green-red/http/shields.io.svg"></a>
    <a href="https://www.python.org/"><img alt="Python" src="https://img.shields.io/pypi/pyversions/yt2mp3.svg"></a>
    <a href="https://flask.palletsprojects.com/en/2.0.x/"><img alt="Flask API" src="./assets/flask-badge.svg" ></a>
    <a href="https://www.mongodb.com/"><img alt="MongoDB 4.0,4.2,4.4" src="https://img.shields.io/badge/mongodb-4.0,_4.2,_4.4-green.svg?logo=mongodb&style=flat"></a>
    <a href="https://reactjs.org"><img alt="ReactJS" src="https://badges.aleen42.com/src/react.svg"></a>
</p>

<br>
<br>

FURLS API works with the Flask python server framework and ReactJS as the client javascript framework

# Github Stats
[![GitHub stars](https://img.shields.io/github/stars/ishitb/flask-url-shortener.svg?style=social&label=⭐Stars&style=plastic&color=green)]()

[![GitHub stars](https://img.shields.io/github/forks/ishitb/flask-url-shortener.svg?style=social&label=🍴Forks&style=plastic&color=green)]()

# Contents
-   [Introduction](#introduction)
-   [Technology Stack](#⚡technology-stack)
-   [Getting Started](#getting-started)
    -   [Running FURLS API](#running-furls-api)
        -   [Compatibility](#compatibility)
            -   [Python](#python)
            -   [MongoDB](#mongodb)
        -   [Locally](#locally)
    -   [Running FURLS API elsewhere](#running-furls-elsewhere)
        -   [Sample Application](#sample-application)
-   [Configuration](#configuration)
    -   [Loggin](#loggin)
    -   [Installation](#installation)
    -   [Running](#running)
-   [Maintainer](#👨‍💻maintainer)

# Introduction 
FURLS is a simple URL shortener application created using the following [Technology Stack](⚡technology-stack). It displays a beautiful UI with proper error handling. Signing up to save and edit the shortened URLs is also supported.

# ⚡Technology Stack

### [Python](https://www.python.org/) 
### [MongoDB](https://www.mongodb.com/)
### [ReactJS](https://reactjs.org/)

# Getting Started
The fastest and easiest way to get started is to run MongoDB and FURLS API locally.

## Running FURLS API

Before you start make sure you have installed:

-   [NodeJS](https://www.npmjs.com/) that includes `npm` 
-   [Python](https://www.python.org/) 
-   [MongoDB](https://www.mongodb.com/)
-   Optionally, you can use [MongoDB Atlas Cloud](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjLl8nM6-XwAhVBRisKHSYdBkIYABAAGgJzZg&ae=2&ohost=www.google.com&cid=CAESQeD2OLkG8ActODm1KmFAdlyZOFr2wWr2P_mJDiYdgSKWVT8wvleW3q6j2PXMP8lOGFKgLieWWwu1JMKuQoxdHzHi&sig=AOD64_0Rs5sEOWnn4X5jMlho_xZKz9jYVA&q&adurl&ved=2ahUKEwizvsHM6-XwAhWe4XMBHRThAdsQ0Qx6BAgCEAE) for your database needs. Just remember to add the DB URI in the .env file.
-   Make sure you have all the environment variables configured, as mentioned in the .env.sample file.

### Compatibility

#### Python

| Version   | Latest Version | Compatibility       |
| --------- | -------------- | ------------------- |
| Python -- | 3.6.x.-        | ✅ Fully compatible |
| Python -- | 3.8.x.-        | ✅ Fully compatible |
| Python -- | 3.9.x  .-      | ✅ Fully compatible |

#### ReactJS

| Version   | Latest Version | Compatibility       |
| --------- | -------------- | ------------------- |
| React  -- | 16.x.-         | ✅ Fully compatible |
| React  -- | 17.x.-         | ✅ Fully compatible |

#### MongoDB

FURLS API is continuously tested with the most recent releases of MongoDB to ensure compatibility. I follow the [MongoDB support schedule](https://www.mongodb.com/support-policy) and only test against versions that are officially supported and have not reached their end-of-life date.

| Version     | Latest Version | End-of-Life Date | Compatibility       |
| ----------- | -------------- | ---------------- | ------------------- |
| MongoDB 4.0 | 4.0.-          | January 20-      | ✅ Fully compatible |
| MongoDB 4.2 | 4.2.-          | TBD              | ✅ Fully compatible |
| MongoDB 4.4 | 4.4.-          | TBD              | ✅ Fully compatible |

## Running FURLS Elsewhere
### Sample Application

I have provided a basic [Heroku deployed application](https://furls.herokuapp.com) that uses the FURLS API module on Flask adn React.JS as client and can be easily deployed to various infrastructure providers:

-   [Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
-   [AWS](https://aws.amazon.com/getting-started/hands-on/deploy-nodejs-web-app/)
-   [Google App Engine](https://cloud.google.com/appengine/docs/standard/nodejs/building-app)
-   [Microsoft Azure](https://azure.microsoft.com/en-in/develop/nodejs/)
-   [Digital Ocean](https://try.digitalocean.com/deploy-nodejs/?utm_campaign=apac_app_platform_kw_en_cpc&utm_adgroup=deploy_nodejs&_keyword=%2Bdeploy%20%2Bnodejs&_device=c&_adposition=&utm_content=conversion&utm_medium=cpc&utm_source=google)

# Configuration
## Logging

FURLS API will, by default, log:
* to the console

## Installation
Please make sure you have git installed and the [prerequisites]((#running-furls-api)) properly setup. Run the following commands to clone the project and install the necessary libraries.

```bash
$ pip install -r requirements.txt
$ cd client && npm install
```

## Running

### Using the CLI

The easiest way to run the FURLS is through the CLI:

#### Server
```bash
$ python app.py
```

#### Client
```bash
$ cd client
$ npm run start
```


# 👨‍💻Maintainer

<table>
  <tr>
    <td align="center"><a href="https://github.com/ishitb"><img src="https://avatars.githubusercontent.com/u/53562523?v=4" width="100px;" alt=""/><br /><sub><b>Ishit Beswal</b></sub></a><br /></td>
  </tr>
</table>