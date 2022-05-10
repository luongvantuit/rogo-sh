import { fetchApi } from "./Base";

export class RoomApi {

    static async add(){

    }

    static async update(){
        
    }

    static async getListRoomsOfHotel(hotelId: string) {
        return await fetchApi({ path: "/room/get/" + hotelId });
    }

    static async getDetailRoom(hotelId: string, roomId: string) {
        return await fetchApi({ path: "room/get/" + hotelId + "/" + roomId });
    }
}
