export interface IRoom {
    _id: string;
    id_hotel: string;
    is_available: boolean;
    name: string;
    home_type: number;
    floor: number;
    room_type: number;
    total_occupancy: number;
    total_bedrooms: number;
    total_bathrooms: number;
    summary: string;
    address: string;
    has_tv: boolean;
    has_kitchen: boolean;
    has_air_con: boolean;
    has_heating: boolean;
    has_internet: boolean;
    price: number;
    owner_id: string;
    created_at: Date;
    updated_at: Date;
}
