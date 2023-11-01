import { ServiceUnavailableException } from '@nestjs/common';

export class SQLiteDatabaseException extends ServiceUnavailableException {
  constructor(error) {
    super(error.message, { cause: error, description: error.code });
  }
}
