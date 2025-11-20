import Joi from "joi";

export const signupValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(32).required().messages({
      "string.empty": "First name is required!",
      "string.min": "First name should be at least two characters long!",
      "string.max": "First name should not be more than 32 characters!",
    }),
    lastName: Joi.string().min(2).max(32).required().messages({
      "string.empty": "Last name is required!",
      "string.min": "Last name should be at least 2 characters!",
      "string.max": "Last name should not be more than 32 characters!",
    }),
    password: Joi.string()
      .min(6)
      .max(128)
      .required()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"))
      .messages({
        "string.empty": "Password is required!",
        "string.min": "Password should be at least 6 characters!",
        "string.max": "Password should not exceed 128 characters!",
        "string.pattern.base":
          "Password should include at least lowercase and uppercase letters and numbers!",
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "Email is required!",
        "string.email": "Email must be valid!",
      }),
  });

  return schema.validate(data, { abortEarly: false });
};
