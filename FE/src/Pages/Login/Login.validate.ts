import { TFunction } from "i18next";

import { FormikErrors } from "formik";

import { ValidField, validationResult } from "../../Constraints/Shared.Validation";
import { LoginValues } from "./Login";

export function validateLogin(
  values: LoginValues,
  t: TFunction
): FormikErrors<LoginValues> {
  return validationResult({
    email: validateEmail(values, t),
    password: validatePassword(values, t),
  });
}

const validateEmail = (values: LoginValues, t: TFunction) => {
  if (!values.email) {
    return t("{{field}} is a required field", {
      field: "email",
    });
  }
  return ValidField;
};

const validatePassword = (values: LoginValues, t: TFunction) => {
  if (!values.password) {
    return t("{{field}} is a required field", {
      field: "Password",
    });
  }
  return ValidField;
};
