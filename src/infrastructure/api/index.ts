import { ApiConfig } from '../../core/contracts';

import composeGetUserById from './getUserById';
import composeGetAvatarById from './getAvatarByUserId';
import composeRemoveAvatarById from './removeAvatarById';

interface Dependencies {
  config: ApiConfig;
}

export default (dependencies: Dependencies) => {
  const getUserById = composeGetUserById(dependencies.config);

  const getAvatarByUserId = composeGetAvatarById(dependencies.config);

  const removeAvatarByUserId = composeRemoveAvatarById(dependencies.config);

  return {
    getUserById,
    getAvatarByUserId,
    removeAvatarByUserId,
  };
};