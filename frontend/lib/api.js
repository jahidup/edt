export const API = process.env.NEXT_PUBLIC_API_URL;
export const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
export const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
