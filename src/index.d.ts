
declare type CheckInData = {
    _id: any;
    roomId: string;
    rogoLocationId: string;
    checkIn: Date;
    checkOut: Date;
    isCheckOut: false;
    totalTimeRent: number;
    roomPrice: number;
    totalPay: number;
    notDisturb: false;
    timeNotDisturb: number;
    userId: string;
    numberPeople: number;
    createdAt: Date;
    updatedAt: Date;
    uuid: string 
}

declare type Room = {
  checkInData: CheckInData[];
  name: string;
  isAvailable: boolean;
  atFloor: number;
  price: number;
  rogoLocationId: number;
  userId: string;
  createAt: Date;
  updatedAt: Date;
  uuid: string;
};