import { isNil } from 'ramda';
// @ts-ignore
import { Either } from 'ramda-fantasy';
import * as Joi from 'joi';

import { RequestValidationError } from '../../core/errors/errorsClass';

export type RemoveAvatarByUserIdValidation = (
  req: {
    userId: string,
  },
) => Either<RequestValidationError, {
  key: string,
}>;

const removeAvatarByUserIdValidation: RemoveAvatarByUserIdValidation = (
  req,
) => {

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
    `${result.error.message} for removeAvatarByUserId method`,
    result.error.details,
  );

  return Either.Left(error);
};

export default removeAvatarByUserIdValidation;