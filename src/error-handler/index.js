export default class ErrorHandler {
  constructor(status, msg) {
    this.status = status;
    this.msg = msg;
  }

  static valdationError(message = "All fields are required") {
    return new ErrorHandler(422, message);
  }

  static badRequestError(message = "Bad credentials") {
    return new ErrorHandler(400, message);
  }

  static userAlreadyExistsError(message = "User already exists") {
    return new ErrorHandler(409, message);
  }

  static forbiddenError(message = "Forbidden") {
    return new ErrorHandler(403, message);
  }

  static notFoundError(message = "ItemNotFound") {
    return new ErrorHandler(404, message);
  }
  static notAvailableYet(message = "ItemNotFound") {
    return new ErrorHandler(406, message);
  }

  static tokenExpired(message = "Token expired") {
    return new ErrorHandler(401, message);
  }
}
