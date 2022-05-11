import { fetchApi } from "./Base";

export class RoomApi {
    static async add() {}

    static async update() {}

    static async getListRoomsOfHotel() {
        return await fetchApi({ path: "/room/get/626d51b0f78be771c6812dac" });
    }

    static async getDetailRoom(roomId?: string) {
        return await fetchApi({
            path: "room/get/626d51b0f78be771c6812dac/" + roomId,
        });
    }
}
