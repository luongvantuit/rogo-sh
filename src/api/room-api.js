import { fetchApi } from "./base.js";

export class RoomApi {



    static async getDetailRoom(token, roomId, key = 'default') {
        return await fetchApi({
            path: `/room/get_detail/${roomId}?key=${key}`,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }

    static async getFilterRoom(token, filter, key = 'default') {
        return await fetchApi({
            path: `/room/filter?key=${key}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(filter),
            method: 'POST'
        });
    }

    static async getRoomWithCheckInData(token, filter, key = 'default') {
        return await fetchApi({
            path: `/room/checkin_data?key=${key}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(filter),
            method: 'POST'
        });
    }

}
