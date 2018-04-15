'use strict';

import { EggAppConfig } from 'egg';

export default (appInfo: EggAppConfig) => {
  const config: any = {};

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1523508510075_3084';

  // add your config here
  config.middleware = [];
  config.security = {
    csrf: {enable: false}
  }
  return config;
};
