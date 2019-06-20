import {
  UserNotFoundError,
} from '../errors/errorsClass';

export interface ErrorRpc {
  message: string;
  code: number;
  data?: any;
}

export type DefaultApiMethodErrorHandler = (
  err: Error,
) => ErrorRpc;

export type InfrastructureError = UserNotFoundError;