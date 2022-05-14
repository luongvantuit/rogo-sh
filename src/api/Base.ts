export async function fetchApi({
    path,
    body,
    headers,
    method = "GET",
}: {
    path: string;
    body?: any;
    headers?: HeadersInit | undefined;
    method?: "GET" | "POST" | "PUT" | "DELETE";
}) {
    const urlApi: string =
        process.env.REACT_APP_API_URL || "https://hotel.rogo.com.vn";
    const versionApi: string = process.env.REACT_VERSION_API || "v1";
    return await fetch(`${urlApi}/${versionApi}${path}`, {
        method: method,
        body: body,
        headers: headers,
    });
}
