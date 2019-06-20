import Fluture from 'fluture';

import { UserNotFoundError } from '../errors/errorsClass';

export type GetUserById = (
  userId: string,
) => Fluture<UserNotFoundError, object>;

export type GetAvatarByUserId = (
  userId: string,
) => Fluture<Error, object>;

export type RemoveAvatarByUserId = (
  userId: string,
) => Fluture<Error, object>;