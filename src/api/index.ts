import {
  Logger,
  ServerConfig,
} from '../core/contracts';

import composeServer from './server';

import { defaultApiMethodErrorHandler } from '../core/errors';
import { GetUserByIdService } from '../application/getUserById';
import { GetAvatarByUserIdService } from '../application/getAvatarByUserId';
import {
  RemoveAvatarByUserIdService,
} from '../application/removeAvatarByUserId';

import composeGetUserById from './getUserById';
import getUserByIdValidation from './validation/getUserById';

import composeGetAvatarByUserId from './getAvatarByUserId';
import getAvatarByUserIdValidation from './validation/getAvatarByUserId';

import composeRemoveAvatarByUserId from './removeAvatarByUserId';
import removeAvatarByUserIdValidation from './validation/removeAvatarByUserId';


interface Dependencies {
  getUserByIdService: GetUserByIdService;
  getAvatarByUserIdService: GetAvatarByUserIdService;
  removeAvatarByUserIdService: RemoveAvatarByUserIdService;

  serverConfig: ServerConfig;
  logger: Logger;
}

export default (dependencies: Dependencies) => {

  const partialDefaultApiMethodErrorHandler =
    defaultApiMethodErrorHandler(dependencies.logger);

  const getUserById = composeGetUserById(
    getUserByIdValidation,
    dependencies.getUserByIdService,
    partialDefaultApiMethodErrorHandler,
  );

  const getAvatarByUserId = composeGetAvatarByUserId(
    getAvatarByUserIdValidation,
    dependencies.getAvatarByUserIdService,
    partialDefaultApiMethodErrorHandler,
  );

  const removeAvatarByUserId = composeRemoveAvatarByUserId(
    removeAvatarByUserIdValidation,
    dependencies.removeAvatarByUserIdService,
    partialDefaultApiMethodErrorHandler,
  );

  const { server } = composeServer({
    getUserById,
    getAvatarByUserId,
    removeAvatarByUserId,

    serverConfig: dependencies.serverConfig,
    logger: dependencies.logger,
  });

  return {
    server,

    getUserByIdMethod: getUserById,
    getAvatarByUserIdMethod: getAvatarByUserId,
    removeAvatarByUserIdMethod: removeAvatarByUserId,
  };
};