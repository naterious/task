import cors from 'cors';
import bodyParser from 'body-parser';

import { Application } from 'express';
import { ExpressServer } from './express';
import { SetupRoutes } from './router';
import {
  Logger, ServerConfig,
} from '../../core/contracts';


const setupMiddleware = (
  app: Application,
): void => {
  app.use(bodyParser.json());
  app.use(cors());
};

export default (
  createServer: ExpressServer,
  setupRoutes: SetupRoutes,
  serverConfig: ServerConfig,
  logger: Logger,
) => () => {
  const app = createServer();
  setupMiddleware(app);
  setupRoutes(app);
  logger.info(`Server running at port ${serverConfig.port}`);

  return app.listen(serverConfig.port);
};
