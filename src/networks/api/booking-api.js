import { fetchApi } from "./base.js";

export class BookingApi {
  static async checkIn(
    token,
    roomId,
    timeCheckIn,
    timeCheckOut,
    numberPeople = 2
  ) {
    return fetchApi({
      path: `/booking/add`,
      body: JSON.stringify({
        roomId: roomId,
        checkIn: timeCheckIn,
        checkOut: timeCheckOut,
        numberPeople: numberPeople,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  }

  static async checkOut(token, roomId, timeCheckOut = new Date()) {
    return fetchApi({
      path: `/booking/checkout`,
      body: JSON.stringify({
        roomId: roomId,
        checkout: timeCheckOut.toISOString(),
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  }

  static async updateCheckOutTime(token, bookingId, checkOutTime) {
    return fetchApi({
      path: `/booking/update`,
      body: JSON.stringify({
        uuid: bookingId,
        checkOut: checkOutTime.toISOString(),
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  }

  static async revokeCode(roomId) {
    return fetchApi({
      path: `/booking/get/626d51b5f78be771c6812dae/${roomId}`,
      method: "GET",
    });
  }
}
