import {
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_NAME,
  DEFAULT_ERROR_STATUS,
} from "./constants";

import type { JSON } from "./types";
import { ServerError } from "./errors";

export async function request(
  url: string | URL,
  data?: JSON,
  init?: RequestInit
): Promise<JSON> {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  const res = await fetch(url, {
    ...init,
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let body;

    try {
      body = await res.json();
    } catch (err) {
      throw new ServerError(
        DEFAULT_ERROR_NAME,
        (err as ServerError).message,
        DEFAULT_ERROR_STATUS,
        DEFAULT_ERROR_CODE
      );
    }

    throw new ServerError(
      DEFAULT_ERROR_NAME,
      body.message || res.statusText,
      body.status || res.status,
      body.code || DEFAULT_ERROR_CODE
    );
  } else {
    return await res.json();
  }
}

export function jsonGET(url: string | URL, init?: ResponseInit): Promise<JSON> {
  return request(url, undefined, { ...init, method: "GET" });
}

export function jsonPOST(
  url: string | URL,
  data?: JSON,
  init?: ResponseInit
): Promise<JSON> {
  return request(url, data, { ...init, method: "POST" });
}

export function jsonPUT(
  url: string | URL,
  data?: JSON,
  init?: ResponseInit
): Promise<JSON> {
  return request(url, data, { ...init, method: "PUT" });
}

export function jsonPATCH(
  url: string | URL,
  data?: JSON,
  init?: ResponseInit
): Promise<JSON> {
  return request(url, data, { ...init, method: "PATCH" });
}

export function jsonDELETE(
  url: string | URL,
  init?: ResponseInit
): Promise<JSON> {
  return request(url, undefined, { ...init, method: "DELETE" });
}
