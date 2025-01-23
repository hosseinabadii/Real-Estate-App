"use server";

const baseUrl = "https://bayut.p.rapidapi.com";

const options = {
  cache: "force-cache",
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    "x-rapidapi-host": "bayut.p.rapidapi.com",
  },
};

export const fetchHandler = async (endpoint, params) => {
  const query = new URLSearchParams(params);
  const url = `${baseUrl}${endpoint}?${query}`;
  try {
    const response = await fetch(url, options);
    const rateLimitRemaining = response.headers.get(
      "x-ratelimit-requests-remaining"
    );
    console.log(`status=${response.status} | remaining=${rateLimitRemaining}`);

    if (!response.ok) {
      const errorResponse = {
        error: {
          status: response.status,
          message: "Failed to fetch data",
        },
      };
      console.log(errorResponse);
      return errorResponse;
    }

    const result = await response.json();
    const successResponse = {
      success: {
        status: 200,
        message: "Successfully fetched data",
      },
      result,
    };
    return successResponse;
  } catch (error) {
    const errorResponse = {
      error: {
        status: 500,
        message: `Internal Server Error: ${error.message}`,
      },
    };
    console.log(errorResponse);
    return errorResponse;
  }
};
