/**
* container.js
*
* Exports a function that gets the DIC (dependency injection container). No rude jokes.
*/

// The holy grail, the bottle, full of golden oat soda, for our consumption
import { Bottle } from 'bottlejs';

// Third party dependencies
import 'babel-polyfill';

// Our code to wire
import config from './lib/config/project.config.js';
import getLogger from './lib/logger';

import SlackApiManager from './lib/slack_api_manager';
import MemeApi from './lib/meme_api';
import MemebotApi from './lib/memebot_api';

export default function getContainer() {
  const bottle = new Bottle();

  bottle.value('Logger', getLogger(config.logger));

  bottle.factory('SlackApiManager', container => {
    const service = new SlackApiManager();
    service.setLogger(container.Logger);
    return service;
  });

  bottle.factory('MemeApiManager', container => {
    const service = new MemeApiManager();
    service.setLogger(container.Logger);
    return service;
  });

  bottle.factory('MemebotApi', container => {
    const service = new MemebotApi();

    service.setLogger(container.Logger);
    service.setSlackApiManager(container.SlackApiManager);
    service.setMemeApiManager(container.MemeApiManager);

    return service;
  });

  return bottle.container;
}
