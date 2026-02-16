export const hasMinLength = (password: string) => {
  return password.length >= 8;
};

export const hasLetter = (password: string) => {
  return /\p{L}/u.test(password);
};

export const hasDigit = (password: string) => {
  return /\d/.test(password);
};

export const hasSpecialChar = (password: string) => {
  return /[^A-Za-z0-9]/.test(password);
};

export const isValidPassword = (password: string) => {
  return (
    hasMinLength(password) &&
    hasLetter(password) &&
    hasDigit(password) &&
    hasSpecialChar(password)
  );
};
