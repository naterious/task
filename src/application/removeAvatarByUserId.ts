import Fluture from 'fluture';

import { RemoveAvatarByUserId } from '../core/contracts';

export type RemoveAvatarByUserIdService = (
  userId: string,
) => Fluture<Error, object>;

const removeAvatarByUserIdService = (
  removeAvatarByUserId: RemoveAvatarByUserId,
): RemoveAvatarByUserIdService => (userId) => {
  return removeAvatarByUserId(userId);
};

export default removeAvatarByUserIdService;