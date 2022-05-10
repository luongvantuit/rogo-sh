import { RoomScreenState } from "../screens/RoomScreen";

export const DATA_ROOM: {
    listRooms: RoomScreenState[];
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
                location: "Tầng 2, Toà A",
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

export function getRoomById(roomId: string) {
    for (let i = 0; i < DATA_ROOM.length; i++) {
        const floor = DATA_ROOM[i];
        for (let y = 0; y < floor.listRooms.length; y++) {
            const room = floor.listRooms[y];
            if (room.roomId === roomId) {
                return room;
            }
        }
    }

    return null;
}
