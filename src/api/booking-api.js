import { fetchApi } from "./base.js";

export class BookingApi {
    static async checkIn(roomId, timeCheckIn, timeCheckOut) {
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

    static async checkOut(roomId, timeCheckOut) {
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

    static async getDetailBooking(roomId) {
        return fetchApi({
            path: `/booking/get/626d51b5f78be771c6812dae/${roomId}`,
            method: "GET",
        });
    }
}
