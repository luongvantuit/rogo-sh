export async function fetchApi({ path, body, headers, method = "GET" }) {
    const urlApi = "https://hotelv2.rogo.com.vn";
    const versionApi = "v1";
    return await window.fetch(`${urlApi}/api/${versionApi}/hotel${path}?key=default&fromid=dat&partner=RGHOTEL`, {
      method: method,
      body: body,
      headers: {
        ...headers
      },
    }); 
    
}
