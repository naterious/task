import ExtendableError from 'es6-error';

// @ts-ignore
export class DataError extends ExtendableError {
  // tslint:disable-next-line
  data: object;

  constructor(message: string, data?: object) {
    super(message);
    if (data) {
      this.data = data;
    }
  }
}

export class RequestValidationError extends DataError {}

export class UserNotFoundError extends DataError {}
