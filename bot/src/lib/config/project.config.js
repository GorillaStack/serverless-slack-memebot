/**
* project.config.js
*
* Load project config
* Consolidation of environment variables, default values and other configurables
* to avoid magic values in our code
*/

// Use dotenv to read environment variables from our .env file
// Useful for local dev environments, or if you want to supplement framework
import dotenv from 'dotenv';
dotenv.load();

export default {

  // Logger config
  logger: {
    log_level: process.env.LOG_LEVEL || 'info',
    json: false,
  },

  // Slack client config
  slack: {
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_ID,
    verification_token: process.env.SLACK_VERIFICATION_TOKEN,
  },
}
