import {
  DEFAULT_REDIRECT_STATUS,
  DEFAULT_ERROR_STATUS,
  DEFAULT_ERROR_CODE,
} from "./constants";
import { ServerError } from "./errors";
import type { JSON, RedirectStatus, ServerErrorResponse } from "./types";

export function redirect(
  url: string | URL,
  status: RedirectStatus = DEFAULT_REDIRECT_STATUS
): Response {
  return Response.redirect(url, status);
}

export function response(
  dataOrError: JSON | ServerError | Error,
  init?: ResponseInit
): Response {
  if (dataOrError instanceof Error) {
    return errorResponse(dataOrError, init);
  } else {
    return jsonResponse(dataOrError, init);
  }
}
export function jsonResponse(data: JSON, init?: ResponseInit): Response {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  return new Response(JSON.stringify(data), { ...init, headers });
}

export function errorResponse(
  error: ServerError | Error,
  init?: ResponseInit
): Response {
  const data: ServerErrorResponse = {
    error: error.name,
    message: error.message,
    status: error["status"] ?? DEFAULT_ERROR_STATUS,
    code: error["code"] ?? DEFAULT_ERROR_CODE,
  };

  return jsonResponse(data, { ...init, status: data.status });
}
