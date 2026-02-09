export const validateEmail = (email: string): boolean => {
  // basic email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
};
