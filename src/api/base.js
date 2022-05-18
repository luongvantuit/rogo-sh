export async function fetchApi({ path, body, headers, method = "GET" }) {
    const urlApi = "https://hotel.rogo.com.vn";
    const versionApi = "v1";
    return await window.fetch(`${urlApi}/${versionApi}${path}`, {
        method: method,
        body: body,
        headers: headers,
    });
}
