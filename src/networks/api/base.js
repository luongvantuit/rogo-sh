export async function fetchApi({ path, body, headers, method = "GET" }) {
    const urlApi = "http://hotelv2.rogo.com.vn";
    const versionApi = "v1";
    return await window.fetch(`${urlApi}/api/${versionApi}/hotel${path}`, {
      method: method,
      body: body,
      mode: "no-cors",
      headers: headers,
    });
}
