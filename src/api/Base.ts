export async function fetchApi<T, E = any>({
    path,
    body,
    headers,
    method = "GET",
}: {
    path: string;
    body?: any;
    headers?: HeadersInit | undefined;
    method?: "GET" | "POST" | "PUT" | "DELETE";
}): Promise<T | E> {
    const urlApi: string =
        process.env.REACT_APP_URL_API || "https://hotel.rogo.com.vn";
    const versionApi: string = process.env.REACT_VERSION_API || "v1";
    const response = await fetch(`${urlApi}/${versionApi}/${path}`, {
        method: method,
        body: body,
        headers: headers,
    });

    const data = await response.json();
    if (!data["success"]) {
        return data["msg"];
    }
    return (await response.json()) as T;
}
