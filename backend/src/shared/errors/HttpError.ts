import { HttpStatusEnum } from "../enums/HttpStatusEnum";

export class HttpError extends Error {
  public readonly statusCode: HttpStatusEnum;
  public readonly error?: any;

  constructor(message: string, statusCode: HttpStatusEnum, error?: any) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
