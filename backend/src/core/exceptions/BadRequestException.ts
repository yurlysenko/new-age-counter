import { ExceptionError } from '../abstract/exception-error';
import { HttpStatus } from '../enums/http-status-codes';

export class BadRequestException extends ExceptionError {
  constructor(msg?: string) {
    super(HttpStatus.BAD_REQUEST, msg ?? BadRequestException.name);
  }
}
