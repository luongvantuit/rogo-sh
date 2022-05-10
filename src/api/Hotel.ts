import { fetchApi } from "./Base";

export class HotelApi {
    static async getListHotels() {
        return await fetchApi({ path: "/hotel/get" });
    }

    static async add() {}

    static async update() {}

    static async getDetailHotel(hotelId: string) {
        return await fetchApi({ path: "/hotel/get/" + hotelId });
    }
}
