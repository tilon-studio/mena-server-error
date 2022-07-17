export function queryParams(request: Request): Record<string, string> {
  const url = new URL(request.url);
  const params = {};

  url.searchParams.forEach((value: string, key: string) => {
    params[key] = value;
  });

  return params;
}

export function queryString(data: Record<string, string>): string {
  return new URLSearchParams(data).toString();
}
