import Fluture from 'fluture';

import { GetUserById } from '../core/contracts';

export type GetUserByIdService = (userId: string) => Fluture<Error, object>;

const getUserByIdService = (
  getUserById: GetUserById,
): GetUserByIdService => (userId) => {
  return getUserById(userId);
};

export default getUserByIdService;