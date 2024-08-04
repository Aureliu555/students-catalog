class AppError extends Error {}

export class NotFoundError extends AppError {}
export class AlreadyExistsError extends AppError {}
export class InvalidParamsError extends AppError {}
export class InvalidCredentialsError extends AppError {}
export class ExistentEmailError extends AppError {}
export class UnauthorizedError extends AppError {}
export class NoItemToDeleteError extends AppError {}
export class InvalidDateError extends AppError {}
export class InvalidIdError extends AppError {}
