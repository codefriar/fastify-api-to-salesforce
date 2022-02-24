# **Fastify API to Salesforce**

## Table of Contents

-   [Description](#description)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Contribution Guidelines](#guidelines)
-   [License](#license)

## Description

> FOR EXAMPLE PURPOSES ONLY

This is an example, opinionated app that demonstrates how a heroku hosted Fastify / Node app can make a http request to a third party api, parses the results, and inserts them into Salesforce.

There's no reason this app can't be _triggered_ from an http callout within a Salesforce Org. Which means that Salesforce based logic can make a http request to a heroku hosted instance of this app and get a list of inserted record Ids back, within Salesforce.

[This app was inspired by this tweet thread:](https://twitter.com/patidarvikas92/status/1495723332263628800?s=21)

Notes:

-   Uses JTW server to server auth. THIS IS FOR EXAMPLE PURPOSES ONLY. You'd likely want some other mechanism for authentication that preserved ownership etc. in real life.
-   Uses the jsForce bulk api to insert. That said, the full breadth of Salesforce API's available in JsForce are available to you here as well.

> FOR EXAMPLE PURPOSES ONLY

## Installation

> FOR EXAMPLE PURPOSES ONLY

These instructions are intentionally high-level.

1. Familiarize yourself with the Salesforce JWT authorization flow. Make sure you have properly set that up.
1. Clone this repo.
1. Create a .env file defining these properties:

```
SF_USERNAME=
SF_LOGIN_URL=
SF_REDIRECT_URL=
SF_CLIENT_ID=FQUs=
SF_CLIENT_SECRET=
PRIVATE_KEY=""
```

1. Test the app locally by:
    - `node start`
    - use postman, or equivalent to POST this json to http://0.0.0.0:3000/trigger
    ```
    {
        "uri": "http://mockbin.org/bin/4f35243b-b986-43b9-b296-1ac8c39f428a"
    }
    ```
1. If everything succeeds you'll find 50 new account records in your org. You are using a scratch org, or sandbox yes?
1. Create a new heroku app.
1. Ensure you're logged in via the heroku cli
1. Execute `git push heroku main` in a terminal
1. Make Environment variables in the Heroku UI that match the .evn contents above. Make sure your Heroku app url is in the SF_REDIRECT_URL key.

## Usage

This app, as written, reacts to the `/trigger` endpoint. When a JSON object with a `url` key is posted to the endpoint it will:

-   fetch the provided url
-   attempt to make Salesforce compatible models from the fetch results
-   upload those Salesforce models to your authenticated org using the bulk api.

Currently this app has only been tested with the mockbin found here: [http://mockbin.org/bin/4f35243b-b986-43b9-b296-1ac8c39f428a](http://mockbin.org/bin/4f35243b-b986-43b9-b296-1ac8c39f428a)

## Contribution Guidelines

Fork & submit a PR. use branches please

## Contributors

This app wouldn't be possible without [Julián Duque](https://github.com/julianduque) schooling me in some oddball commonjs/esm issues. Check him out.

## GitHub Username

codefriar

## Email Address

kjp@codefriar.com

# License

[![License: CC0-1.0](https://img.shields.io/badge/CC0-Creative%20Commons%20Zero-Blue)](http://creativecommons.org/publicdomain/zero/1.0/)
