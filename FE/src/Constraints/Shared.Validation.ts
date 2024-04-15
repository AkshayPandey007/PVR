import { FormikTouched, FormikValues } from "formik";
import { TFunction } from "i18next";

export const ValidForm = {};

export const ValidField = undefined;

export type ValidationResult = string | undefined;

export type FieldTouched = FormikTouched<unknown> | undefined;

export type Validate = (value: string, t: TFunction) => string;

export const validate = (
  next: () => ValidationResult,
  touched: FieldTouched
) => {
  if (!touched) return ValidField;
  return next();
};

/**
 * A form error message should only be displayed after the input
 * field has been "touched"
 */
export const validationError = (
  errorMessage: unknown | undefined,
  touched: FieldTouched
) => {
  return touched ? (errorMessage as string) : undefined;
};

/**
 * Removed all undefined keys from FormikValues, a form is considered
 * valid when it receives an empty object.
 */
export const validationResult = (values: FormikValues) => {
  Object.keys(values).forEach((key) => {
    if (values[key] === undefined) {
      delete values[key];
    }
  });
  return values;
};

export type ValidationDeps = {
  validEmail: (value: string) => boolean;
  isNumeric: (value: string) => boolean;
};