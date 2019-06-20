import { Response, Request } from 'express';

import { eitherToFluture } from './validation/handlers';

import { GetAvatarByUserIdValidation } from './validation/getAvatarByUserId';
import {
  ErrorRpc,
  DefaultApiMethodErrorHandler,
} from '../core/contracts';
import { GetAvatarByUserIdService } from '../application/getAvatarByUserId';

export type GetAvatarByUserIdMethod = (
  req: Request & { params: { userId: string } },
  res: Response,
) => any;

export default (
  getAvatarByUserIdValidation: GetAvatarByUserIdValidation,
  getAvatarByUserIdService: GetAvatarByUserIdService,
  defaultApiMethodErrorHandler: DefaultApiMethodErrorHandler,
): GetAvatarByUserIdMethod => (req, res) => {
  return eitherToFluture(getAvatarByUserIdValidation({
      ...req.params,
    }))
    .chain(getAvatarByUserIdService)
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
