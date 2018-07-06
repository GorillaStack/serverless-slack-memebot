# serverless-slack-memebot

We implemented a memebot for slack, built on the [serverless framework](https://serverless.com/) to use as a demonstration for the [Disruptors in Tech meetup](https://www.meetup.com/en-AU/Disruptors-in-Tech/).  [See slides](https://slid.es/em0ney/sls).  It was implemented by [GorillaStack](www.gorillastack.com) to serve as a boilerplate for similar serverless projects.

The key purpose of the talk was to demonstrate how to work with frameworks and minimise risks around framework changes and provider lock-in.

## Usage


### Development environment

It is possible to run this slackbot in your slack rooms without deploying to AWS!

#### Local environment variables

The serverless framework will be loading environment variables from the file `bot/.env`.  For security reasons, we ignore this file from the repository.  There is an example file you can copy.

```
cp bot/.env.example bot/.env
```

Then, it is important to get `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET` and the `SLACK_VERIFICATION_TOKEN` from `Settings` > `Basic Information` within the configuration of the Slack App.

Terminal1:

```shell
#!/bin/bash

## First install npm dependencies for the project
npm install

## Now install npm dependencies that will be packaged up with our slackbot and deployed
pushd bot && npm install && popd

## Now run babel in watch mode to listen for changes to our code
npm run compile:dev
```

Terminal2:

```shell
#!/bin/bash

## Move into the bot/ directory
cd bot

## Run the offline plugin for the serverless framework to emulate API gateway and invoke our lambda functions
## We should now be listening on localhost:3000
sls offline
```

Terminal3:

```shell
#!/bin/bash

## Use ngrok to expose our localhost:3000 to a public https endpoint
ngrok http 3000
```

While contributing, or working on your fork, run `npm test` to run tests, `npm run cover` to run tests and check code coverage and `npm run lint` to check our code styling.  To see an HTML report of our code coverage, go to `/path/to/project/coverage/lcov-report/index.html` in your web browser.

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

### Deploy to production


