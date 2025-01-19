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
  const properties = await fetch(apiURL, options)
    .then((response) => {
      console.log(
        `status=${response.status} | remaining=${response.headers.get(
          "x-ratelimit-requests-remaining"
        )}`
      );
      if (!response.ok) throw new Error(`status=${response.status}`);
      return response.json();
    })
    .catch((error) => console.log("Error in fetching properites:", error));

  return Response.json(properties);
}
