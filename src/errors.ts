import { DEFAULT_ERROR_CODE, DEFAULT_ERROR_STATUS } from "./constants";
import type { ServerErrorResponse } from "./types";

export class ServerError extends Error {
  status?: number;
  code?: string;

  constructor(name: string, message: string, status?: number, code?: string) {
    super(message);
    this.name = name;
    this.status = status;
    this.code = code;
  }

  toJson(): ServerErrorResponse {
    return errorToJson(this);
  }
}

export function errorToJson(error: Error | ServerError) {
  return {
    error: error.name,
    message: error.message,
    status: error["status"] ?? DEFAULT_ERROR_STATUS,
    code: error["code"] ?? DEFAULT_ERROR_CODE,
  };
}
