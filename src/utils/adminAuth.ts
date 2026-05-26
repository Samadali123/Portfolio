const ADMIN_TOKEN_KEY = 'nexora_admin_token';

export const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY);

export const setAdminToken = (token: string) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const clearAdminToken = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

export const adminApiFetch = async (path: string, options: RequestInit = {}) => {
  const token = getAdminToken();
  const headers = new Headers(options.headers);

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const data = await response.json();

    if (!response.ok || data.success === false) {
      throw new Error(data.message || 'Request failed.');
    }

    return data;
  }

  if (!response.ok) {
    throw new Error('Request failed.');
  }

  return response;
};
