import { fetchApi } from "./Base";

export class BookingApi {
    static async checkIn(
        roomId?: string,
        timeCheckIn?: string,
        timeCheckOut?: string
    ) {
        return fetchApi({
            path: "/booking/add",
            body: JSON.stringify({
                user_id: "user_id",
                room_id: roomId,
                checkin: timeCheckIn,
                checkout: timeCheckOut,
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    static async checkOut(roomId?: string, timeCheckOut?: string) {
        return fetchApi({
            path: "/booking/checkout",
            body: JSON.stringify({
                room_id: roomId,
                checkout: timeCheckOut,
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    static async getDetailBooking(roomId?: string) {
        return fetchApi({
            path: `/booking/get/626d51b0f78be771c6812dac/${roomId}`,
            method: "GET",
        });
    }
}
