import { of, reject } from 'fluture';
import fs from 'fs';
import * as r from 'ramda';

import { ApiConfig, RemoveAvatarByUserId } from '../../core/contracts';

const removeAvatarById = (
  config: ApiConfig,
): RemoveAvatarByUserId => (
  userId,
) => {
  return r.ifElse(
    r.equals(true),
    () => {
      fs.unlinkSync(userId);
      return of(`Deleted avatar for user with id: '${userId}'`);
    },
    () => {
      return reject({
        message: `Avatar for user with id: '${userId}' not found`,
      });
    },
  )(fs.existsSync(userId));
};

export default removeAvatarById;