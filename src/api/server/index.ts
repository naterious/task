import {
  Logger,
  ServerConfig,
} from '../../core/contracts';

import { GetUserByIdMethod } from '../getUserById';
import { GetAvatarByUserIdMethod } from '../getAvatarByUserId';
import { RemoveAvatarByUserIdMethod } from '../removeAvatarByUserId';

import server from './server';
import expressServer from './express';
import router from './router';

interface Dependencies {
  getUserById: GetUserByIdMethod;
  getAvatarByUserId: GetAvatarByUserIdMethod;
  removeAvatarByUserId: RemoveAvatarByUserIdMethod;

  serverConfig: ServerConfig;
  logger: Logger;
}

export default (dependencies: Dependencies) => {
  const partialRouter = router(dependencies);

  const partialServer = server(
    expressServer,
    partialRouter,
    dependencies.serverConfig,
    dependencies.logger,
  );

  return {
    server: partialServer,
  };
};