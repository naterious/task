import composeConfig from './config';
import logger from './logger';
import composeApi from './api';

export default () => {
  const config = composeConfig();
  const api = composeApi({
    config: config.getApiConfig(),
  });

  return {
    serverConfig: config.getServerConfig(),
    systemConfig: config.getSystemConfig(),

    logger,
    ...api,
  };
};
