import {
  GetUserById,
  GetAvatarByUserId,
  RemoveAvatarByUserId,
} from '../core/contracts';

import composeGetUserById from './getUserById';
import composeGetAvatarByUserId from './getAvatarByUserId';
import composeRemoveAvatarByUserId from './removeAvatarByUserId';

interface Dependencies {
  getUserById: GetUserById;
  getAvatarByUserId: GetAvatarByUserId;
  removeAvatarByUserId: RemoveAvatarByUserId;
}

export default (dependencies: Dependencies) => {
  const getUserByIdService = composeGetUserById(dependencies.getUserById);

  const getAvatarByUserIdService = composeGetAvatarByUserId(
    dependencies.getAvatarByUserId,
  );

  const removeAvatarByUserIdService = composeRemoveAvatarByUserId(
    dependencies.removeAvatarByUserId,
  );

  return {
    getUserByIdService,
    getAvatarByUserIdService,
    removeAvatarByUserIdService,
  };
};