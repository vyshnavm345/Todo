export const removeSpaces = (value) => {
  return value.trim().replace(/\s/g, "");
};

export const isPasswordValid = (password) => {
  return !password.includes(" ");
};

export const isEmailValid = (email) => {
  return !email.includes(" ") && /\S+@\S+\.\S+/.test(email);
};

export const doPasswordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const isPhoneNumberValid = (phoneNumber) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phoneNumber);
};
