export const DEFAULT_ERROR_STATUS = 500;
export const DEFAULT_ERROR_NAME = "ServerError";
export const DEFAULT_ERROR_MESSAGE = "Internal error";
export const DEFAULT_ERROR_CODE = "server/internal-error";

export type ErrorJson = {
  error: string;
  message: string;
  status: number;
  code?: string;
};

export class ServerError extends Error {
  status?: number;
  code?: string;

  constructor(name: string, message: string, status?: number, code?: string) {
    super(message);
    this.name = name;
    this.status = status;
    this.code = code;
  }
}

export function errorJson(error: Error & ServerError): ErrorJson {
  return {
    error: error.name ?? DEFAULT_ERROR_NAME,
    message: error.message ?? DEFAULT_ERROR_MESSAGE,
    status: error.status ?? DEFAULT_ERROR_STATUS,
    code: error.code ?? DEFAULT_ERROR_CODE,
  };
}

export function errorResponse(error: Error & ServerError): Response {
  const data = errorJson(error);
  const body = JSON.stringify(data);

  return new Response(body, {
    status: data.status,
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
}
