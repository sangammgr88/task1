
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Origin': BASE_URL,
        'Referer': BASE_URL + '/',
        ...options.headers,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message = errorData.message || res.statusText || "Something went wrong";
      throw new Error(message);
    }

    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}
