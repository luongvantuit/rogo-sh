import { fetchApi } from "./base.js";

export class RoomApi {
    static async add() {}

    static async update() {}

    static async getListRoomsIsAvailableOfHotel() {
        return await fetchApi({ path: "/room/get/626d51b5f78be771c6812dae" });
    }

    static async getDetailRoom(roomId) {
        return await fetchApi({
            path: "/room/get/626d51b5f78be771c6812dae/" + roomId,
        });
    }

    static async getListRoomsFilterOfHotel(filter) {
        return await fetchApi({
            path: "/room/filter/626d51b5f78be771c6812dae",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filter),
        });
    }

    static async getAllRoomsOfHotel() {
        return await fetchApi({
            path: "/room/get_all_room/626d51b5f78be771c6812dae",
        });
    }
}
