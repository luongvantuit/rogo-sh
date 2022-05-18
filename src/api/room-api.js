import { fetchApi } from "./base.js";

export class RoomApi {
    static async add() {}

    static async update() {}

    static async getListRooms() {
        return await fetchApi({ path: "/room/get/626d51b0f78be771c6812dac" });
    }

    static async getDetailRoom(roomId) {
        return await fetchApi({
            path: "/room/get/626d51b0f78be771c6812dac/" + roomId,
        });
    }
}
