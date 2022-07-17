export type JSON = Record<string, unknown>;

export type RedirectStatus = 301 | 302 | 307;

export type ServerErrorResponse = {
  error: string;
  message: string;
  status: number;
  code?: string;
};

export type Predicate = (value: unknown) => boolean;