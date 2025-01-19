const baseURL = process.env.NEXT_PUBLIC_BASE_URL + "/api";
const defaultOptions = {
  cache: "force-cache",
};

export const fetchApi = async (endpoint, params, options = defaultOptions) => {
  const searchParams = new URLSearchParams(params);
  const url = `${baseURL}${endpoint}?${searchParams}`;
  const properties = await fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`status=${response.status}`);
      }
      return response.json();
    })
    .catch((error) => console.log("Error in fetchApi function", error));
  return properties;
};
