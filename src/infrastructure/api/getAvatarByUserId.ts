import rp from 'request-promise';
import { tryP, of } from 'fluture';
import fs from 'fs';
import * as r from 'ramda';
// @ts-ignore
import image2base64 from 'image-to-base64';

import { ApiConfig, GetAvatarByUserId } from '../../core/contracts';

const getAvatarByUserId = (
  config: ApiConfig,
): GetAvatarByUserId => (
  userId,
) => {
  const options = {
    uri: `${config.url}/api/users/${userId}`,
    method: 'GET',
    json: true,
  };

  return r.ifElse(
    r.equals(true),
    () => {
      const file = fs.readFileSync(userId, 'base64');
      return of(file);
    },
    () => {
      // @ts-ignore
      return tryP(() => rp(options))
      .chain((userDetails: {
        data: {
          avatar: string,
        },
      }) => {
        return tryP(() => image2base64(userDetails.data.avatar));
      })
      .map((avatarImageBase64: string) => {
        fs.writeFile(`${userId}`, avatarImageBase64, 'base64', (err) => {
          return err;
        });
        return avatarImageBase64;
      });
    },
  )(fs.existsSync(userId));

};

export default getAvatarByUserId;