const ACCESS_TOKEN_KEY = 'arkevion_access_token';
const REFRESH_TOKEN_KEY = 'arkevion_refresh_token';
const USER_KEY = 'arkevion_auth_user';

export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredUser() {
  const value = sessionStorage.getItem(USER_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    clearAuthSession();
    return null;
  }
}

export function storeAuthSession({ access, refresh, user }) {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, access);
  sessionStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuthSession() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}
