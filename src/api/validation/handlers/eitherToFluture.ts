import Future from 'fluture';
// @ts-ignore
import { Either } from 'ramda-fantasy';

export type EitherToFluture = <T, R>(
  either: Either<T, R>,
) => Future<T, R>;

const eitherToFluture: EitherToFluture = (either) => Future(
  (reject, resolve) => either.either(reject, resolve),
);

export default eitherToFluture;