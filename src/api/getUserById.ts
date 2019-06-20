import { Response, Request } from 'express';

import { eitherToFluture } from './validation/handlers';

import { GetUserByIdValidation } from './validation/getUserById';
import {
  ErrorRpc,
  DefaultApiMethodErrorHandler,
} from '../core/contracts';
import { GetUserByIdService } from '../application/getUserById';

export type GetUserByIdMethod = (
  req: Request & { params: { userId: string } },
  res: Response,
) => any;

export default (
  getUserByIdValidation: GetUserByIdValidation,
  getUserByIdService: GetUserByIdService,
  defaultApiMethodErrorHandler: DefaultApiMethodErrorHandler,
): GetUserByIdMethod => (req, res) => {
  return eitherToFluture(getUserByIdValidation({
      ...req.params,
    }))
    .chain(getUserByIdService)
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
