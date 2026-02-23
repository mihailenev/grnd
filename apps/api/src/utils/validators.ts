export const validateEmail = (email: string): boolean => {
  // basic email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string): boolean => {
  //  at least one letter in any language
  //  at least one digit
  //  at least one special symbol
  //  at least 8 characters
  return (
    password.length >= 8 &&
    /\p{L}/u.test(password) &&
    /\d/.test(password) &&
    /[^\p{L}\p{N}]/u.test(password)
  );
};
