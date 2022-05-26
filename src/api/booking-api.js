import { fetchApi } from "./base.js";

export class BookingApi {
    static async checkIn(token, roomId, timeCheckIn, timeCheckOut, key='default') {
        return fetchApi({
            path: `/booking/checkin?key=${key}`,
            body: JSON.stringify({
                user_id: "user_id",
                room_id: roomId,
                checkin: timeCheckIn,
                checkout: timeCheckOut,
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        });
    }

    static async checkOut(token, roomId, timeCheckOut = new Date(), key = 'default') {
        return fetchApi({
            path: `/booking/checkout?key=${key}`,
            body: JSON.stringify({
                room_id: roomId,
                checkout: timeCheckOut,
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            },
        });
    }

    // static async getDetailBooking(roomId) {
    //     return fetchApi({
    //         path: `/booking/get/626d51b5f78be771c6812dae/${roomId}`,
    //         method: "GET",
    //     });
    // }
}
