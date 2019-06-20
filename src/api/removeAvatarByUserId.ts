import { Response, Request } from 'express';

import { eitherToFluture } from './validation/handlers';

import {
  RemoveAvatarByUserIdValidation,
} from './validation/removeAvatarByUserId';
import {
  ErrorRpc,
  DefaultApiMethodErrorHandler,
} from '../core/contracts';
import {
  RemoveAvatarByUserIdService,
} from '../application/removeAvatarByUserId';

export type RemoveAvatarByUserIdMethod = (
  req: Request & { params: { userId: string } },
  res: Response,
) => any;

export default (
  removeAvatarByUserIdValidation: RemoveAvatarByUserIdValidation,
  removeAvatarByUserIdService: RemoveAvatarByUserIdService,
  defaultApiMethodErrorHandler: DefaultApiMethodErrorHandler,
): RemoveAvatarByUserIdMethod => (req, res) => {
  return eitherToFluture(removeAvatarByUserIdValidation({
      ...req.params,
    }))
    .chain(removeAvatarByUserIdService)
    .mapRej(defaultApiMethodErrorHandler)
    .promise()
    .then((result: any) => {
      return res.status(200).send(result);
    })
    .catch((errRpc: ErrorRpc) => res
      .status(500)
      .send(errRpc),
    );
};
