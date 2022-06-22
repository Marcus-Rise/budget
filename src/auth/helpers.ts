const PASSWORD_MIN_LENGTH = 8;

const passwordLengthValidator = (value: string): boolean | string =>
  value.length >= PASSWORD_MIN_LENGTH ||
  `Длинна логина должна быть не меньше ${PASSWORD_MIN_LENGTH}`;

export { passwordLengthValidator };
