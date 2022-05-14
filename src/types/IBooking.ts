export interface IBooking {
    user_id: string;
    room_id: string;
    checkin: Date;
    checkout: Date;
    is_checkout: boolean;
    room_price: number;
    not_disturb: boolean;
    id_hotel: string;
    time_not_disturb: number;
    _id: string;
    total_hour_rent: number;
    total_pay: number;
    created_at: Date;
    updatedAt: Date;
}
