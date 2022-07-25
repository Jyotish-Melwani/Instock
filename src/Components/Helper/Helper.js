export const emailValidator = (email) => {
  const emailFormat = /\S+@\S+\.\S+/;

  return emailFormat.test(email);
};

export const phoneValidator = (phone) => {
  const phoneFormat = /\+1\s\(\d{3}\)\s\d{3}\-\d{4}/;
  const phoneFormatTest = phoneFormat.test(phone);

  return phoneFormatTest;
};
