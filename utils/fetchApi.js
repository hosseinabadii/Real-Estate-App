const baseURL = process.env.NEXT_PUBLIC_BASE_URL + "/api";
const defaultOptions = {
  cache: "force-cache",
};

export const fetchApi = async (endpoint, params, options = defaultOptions) => {
  const searchParams = new URLSearchParams(params);
  const url = `${baseURL}${endpoint}?${searchParams}`;
  const response = await fetch(url, options);
  return await response.json();
};
