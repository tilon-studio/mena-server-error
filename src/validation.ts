import {
  VALIDATION_ERROR_NAME,
  VALIDATION_ERROR_MESSAGE,
  VALIDATION_ERROR_CODE,
  VALIDATION_ERROR_STATUS,
} from "./constants";
import type { Predicate } from "./types";
import { ServerError } from "./errors";

export function validate(
  value: unknown,
  predicate: Predicate,
  message?: string
) {
  if (!predicate(value)) {
    throw new ServerError(
      VALIDATION_ERROR_NAME,
      message ?? VALIDATION_ERROR_MESSAGE,
      VALIDATION_ERROR_STATUS,
      VALIDATION_ERROR_CODE
    );
  }

  return value;
}
