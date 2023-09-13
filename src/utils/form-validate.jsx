export const emailValidate = {
  required: { value: true, message: "Please enter an email address" },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },
};

export const passwordValidate = {
  required: { value: true, message: "Please enter a password" },
  minLength: { value: 6, message: "Password must be at least 6 characters" },
};

export const usernameValidate = {
    required: { value: true, message: "Please enter a username" },
    minLength: { value: 4, message: "Username must be at least 4 characters" },
    maxLength: { value: 20, message: "Username must be less than 20 characters" },
    pattern: {
        value: /^[a-zA-Z0-9]+$/,
        message: "Username must contain only letters and numbers",
    },
};
