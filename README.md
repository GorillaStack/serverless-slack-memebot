# serverless-slack-memebot

We implemented a memebot for slack, built on the [serverless framework](https://serverless.com/) to use as a demonstration for the [Disruptors in Tech meetup](https://www.meetup.com/en-AU/Disruptors-in-Tech/).  [See slides](https://slid.es/em0ney/sls).  It was implemented by [GorillaStack](www.gorillastack.com) to serve as a boilerplate for similar serverless projects.

The key purpose of the talk was to demonstrate how to work with frameworks and minimise risks around framework changes and provider lock-in.

## Usage


### Development environment

It is possible to run this slackbot in your slack rooms without deploying to AWS! First ensure you have the serverless CLI installed:

```shell
npm install -g serverless
```

#### Local environment variables

The serverless framework will be loading environment variables from the file `bot/.env`.  For security reasons, we ignore this file from the repository.  There is an example file you can copy.

```
cp bot/.env.example bot/.env
```

Then, it is important to get `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET` and the `SLACK_VERIFICATION_TOKEN` from `Settings` > `Basic Information` within the configuration of the Slack App.


Terminal1:

```shell
#!/bin/bash

## Move into the bot/ directory
cd bot

## Run the offline plugin for the serverless framework to emulate API gateway and invoke ## our lambda functions. It works with serverless-webpack to use webpack and babel 
##  so that our code is transformed automatically.
sls offline
## We should now be listening on localhost:3000
```

Terminal3:

```shell
#!/bin/bash

## Use ngrok to expose our localhost:3000 to a public https endpoint
ngrok http 3000
```

While contributing, or working on your fork, run `npm test` to run tests, `npm run cover` to run tests and check code coverage and `npm run lint` to check our code styling.  To see an HTML report of our code coverage, go to `/path/to/project/coverage/lcov-report/index.html` in your web browser.


#### Local slack server

An alternative while testing is to start the included `slackserver` project, which provides a dumb HTTP server that can be
used to emulate Slack locally. Run:

```shell
cd slackserver
npm install
npm start
```

Then, when sending JSON to the local memebot endpoint using `sls offline`, use `http://localhost:3192` as the `response_url` parameter e.g.:

```shell
curl -XPOST http://localhost:3000/memebot -H 'content-type: application/json' -d '{ "response_url": "http://localhost:3192", "token": "abcde12345", "text": "hello" }'
```

### Deploying the serverless stack to AWS

Like the local development environment, you need to to get `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET` and the `SLACK_VERIFICATION_TOKEN` from `Settings` > `Basic Information` within the configuration of the Slack App, and set up a `.env`
in a similar manner.

One you have done that, run `serverless deploy --region <regionname>` in the `bot` directory. Serverless will give you output
simlar to the following:

```
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
.....
Serverless: Stack create finished...                                                                                  
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (3.59 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............................
Serverless: Stack update finished...
Service Information
service: serverless-slack-memebot
stage: dev
region: us-east-2
stack: serverless-slack-memebot-dev
api keys:
  None
endpoints:
  POST - https://38obk0a3e2.execute-api.us-east-2.amazonaws.com/dev/memebot
functions:
  memebot_slash_command: serverless-slack-memebot-dev-memebot_slash_command
```

The endpoint printed above is what you will need to feed back to Slack to register the bot (see next section). The serverless
stack creates a CloudWatch LogGroup for the lambda (you can find this in the Resources tab for the stack in the CloudFormation
console), where logs for the Slack bot will be printed.

### Slack configuration

To integrate your development, production or any other environment with slack, you will need to set up a slack app.

1. Go to https://api.slack.com/apps
1. Click the "Create New App" button
1. Enter your app's name and a development slack team and click "Create App" ![create app](https://s3-ap-southeast-2.amazonaws.com/gorillastack-random/create_app.png)
1. Under "Add features and functionality", click "Slash Commands" ![add features and functionality](https://s3-ap-southeast-2.amazonaws.com/gorillastack-random/add_functionality.png)
1. Click "Create New Command"
1. Enter the command details and press save ![slash command details](https://s3-ap-southeast-2.amazonaws.com/gorillastack-random/create_new_command.png)
1. Select OAuth & Permissions from the sidebar
1. Click "Install App to Team" to finish :)