import { RoomDetailScreenState } from "../screens/RoomDetailScreen";

export const DATA_ROOM: {
    listRooms: RoomDetailScreenState[];
    displayNameFloor: string;
}[] = [
    {
        displayNameFloor: "A",
        listRooms: [
            {
                displayName: "A - 201",
                roomId: "a1",
                doNotDisturb: true,
                howMuchPeople: 2,
                isUsed: true,
                lighting: false,
            },
            {
                displayName: "A - 202",
                roomId: "a2",
                isUsed: false,
            },
            {
                displayName: "A - 203",
                roomId: "a3",
                doNotDisturb: true,
                howMuchPeople: 2,
                isUsed: true,
                lighting: true,
            },
            {
                displayName: "A - 204",
                roomId: "a4",
                howMuchPeople: 3,
                isUsed: true,
                lighting: true,
            },
        ],
    },
    {
        displayNameFloor: "B",
        listRooms: [
            {
                displayName: "B - 201",
                roomId: "b1",
                howMuchPeople: 2,
                isUsed: true,
                lighting: false,
            },
            {
                displayName: "B - 202",
                roomId: "b2",
                isUsed: true,
            },
            {
                displayName: "B - 203",
                roomId: "b3",
                doNotDisturb: true,
                howMuchPeople: 2,
                isUsed: true,
                lighting: true,
            },
        ],
    },
];
