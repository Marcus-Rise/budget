const PASSWORD_MIN_LENGTH = 8;

const passwordLengthValidator = (value: string): boolean | string =>
  value.length >= PASSWORD_MIN_LENGTH || `Не менее ${PASSWORD_MIN_LENGTH} символов`;

export { passwordLengthValidator };
