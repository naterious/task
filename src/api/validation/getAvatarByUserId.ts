import { isNil } from 'ramda';
// @ts-ignore
import { Either } from 'ramda-fantasy';
import * as Joi from 'joi';

import { RequestValidationError } from '../../core/errors/errorsClass';

export type GetAvatarByUserIdValidation = (
  req: {
    userId: string,
  },
) => Either<RequestValidationError, {
  key: string,
}>;

const getAvatarByUserIdValidation: GetAvatarByUserIdValidation = (req) => {

  const schema = Joi
    .object()
    .required()
    .keys({
      userId: Joi
        .string()
        .required(),
    });

  const result = Joi.validate(req, schema);

  if (isNil(result.error)) {
    return Either.Right(result.value.userId);
  }

  const error: RequestValidationError = new RequestValidationError(
    `${result.error.message} for getAvatarByUserId method`,
    result.error.details,
  );

  return Either.Left(error);
};

export default getAvatarByUserIdValidation;