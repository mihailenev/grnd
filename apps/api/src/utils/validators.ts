export const validateEmail = (email: string): boolean => {
  // basic email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
};

export const validatePassword = (password: string): boolean => {
  //  at least one letter in any language
  //  at least one digit
  //  at least one special symbol
  //  at least 8 charaters
  return (
    password.length >= 8 &&
    /\p{L}/u.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
};
