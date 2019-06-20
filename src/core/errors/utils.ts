import {
  pipe, is, T, cond, assoc, always, when, path, isNil,
} from 'ramda';
import {
  Logger, ErrorRpc,
} from '../contracts';
import {
  RequestValidationError,

  UserNotFoundError,
} from './errorsClass';

export const stringifyError = (err: Error): string => {
  if (!isNil(path([ 'data', 'connection' ], err))) {
    // tslint:disable-next-line
    return `${err.message} - ${path([ 'data', 'connection' ], err)}`;
  }
  if (!isNil(path([ 'data', 'error' ], err))) {
    return `${err.message} - ${path([ 'data', 'error' ], err)}`;
  }
  return `${err.message}`;
};

export const getErrorRpc = (err: Error | {
  message: string,
  data: object,
}): ErrorRpc => {
  const code: number = cond([
    [ is(RequestValidationError), always(400) ],

    [ is(UserNotFoundError), always(404) ],

    [ T, always(500) ],
  ])(err);

  return pipe(
    assoc('code', code),
    assoc('message', err.message),
    when(
      () => (code === 400),
      // @ts-ignore
      assoc('data', err.data),
    ),
  )({});
};

export const defaultApiMethodErrorHandler = (
  logger: Logger,
) => (
  err: Error,
): ErrorRpc => {
  if (!is(RequestValidationError, err)) {
    logger.error(stringifyError(err));
  }
  return getErrorRpc(err);
};
