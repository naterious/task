import Fluture from 'fluture';

import { GetAvatarByUserId } from '../core/contracts';

export type GetAvatarByUserIdService = (
  userId: string,
) => Fluture<Error, object>;

const getAvatarByUserIdService = (
  getAvatarByUserId: GetAvatarByUserId,
): GetAvatarByUserIdService => (userId) => {
  return getAvatarByUserId(userId);
};

export default getAvatarByUserIdService;