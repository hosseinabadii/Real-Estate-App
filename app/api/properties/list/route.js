const baseUrl = "https://bayut.p.rapidapi.com";

const options = {
  cache: "force-cache",
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    "x-rapidapi-host": "bayut.p.rapidapi.com",
  },
};

export async function GET(request) {
  const { pathname, search } = request.nextUrl;
  const apiPath = pathname.replace("/api", "");
  const apiURL = `${baseUrl}${apiPath}${search}`;

  try {
    const response = await fetch(apiURL, options);
    const rateLimitRemaining = response.headers.get(
      "x-ratelimit-requests-remaining"
    );
    console.log(`status=${response.status} | remaining=${rateLimitRemaining}`);

    if (!response.ok) {
      const errorResponse = {
        error: {
          status: response.status,
          message: "Failed to fetch list of properties",
        },
      };
      return Response.json(errorResponse, { status: response.status });
    }

    const properties = await response.json();
    const successResponse = {
      success: {
        status: 200,
        message: "Successfully fetched list of properties",
      },
      properties,
    };
    return Response.json(successResponse, { status: 200 });
  } catch (error) {
    const errorResponse = {
      error: {
        status: 500,
        message: `Internal Server Error: ${error.message}`,
      },
    };
    return Response.json(errorResponse, { status: 500 });
  }
}
