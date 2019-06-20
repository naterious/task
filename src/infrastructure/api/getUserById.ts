import rp from 'request-promise';
import { tryP } from 'fluture';

import { UserNotFoundError } from '../../core/errors/errorsClass';

import { ApiConfig, GetUserById } from '../../core/contracts';

const getUserById = (
  config: ApiConfig,
): GetUserById => (
  userId,
) => {
  const options = {
    uri: `${config.url}/api/users/${userId}`,
    method: 'GET',
    json: true,
  };

  // @ts-ignore
  return tryP(() => rp(options))
    .mapRej((err: Error) => {
      return new UserNotFoundError(`${err.name} - ${err.message}`);
    });

};

export default getUserById;