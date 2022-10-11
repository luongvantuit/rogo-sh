import { fetchApi } from "./base.js";

export class RoomApi {

    /**
     * 
     * @param {string} token 
     * @param {string} roomId 
     * @returns 
     */
    static async getDetailRoom(token, roomId) {
        return await fetchApi({
            path: `/room/get/${roomId}`,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }
    /**
     * 
     * @param {string} token 
     * @param {any} filter 
     * @returns 
     */
    static async getFilterRoom(token, filter) {
        return await fetchApi({
            path: `/room/filter`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(filter),
            method: 'POST',
        });
    }

    static async getRoomWithCheckInData(token, filter) {
        console.log(token);
        return await fetchApi({
            path: "/room/getWithCheckinData",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: 'POST',
        });
    }

}
