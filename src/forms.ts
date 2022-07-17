export async function formData(request: Request) {
  const form = await request.formData();
  const data: Record<string, any> = {};

  form.forEach((value, key) => {
    const existingValue = data[key];

    if (existingValue && Array.isArray(existingValue)) {
      data[key] = [...existingValue, value];
    } else if (existingValue) {
      data[key] = [existingValue, value];
    } else {
      data[key] = value;
    }
  });

  return data;
}
