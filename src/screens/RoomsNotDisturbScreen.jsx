import React from "react";
import { RoomApi } from "../api/room-api.js";
import { Container } from "../components/Container.jsx";
import { AppContext } from "../contexts/AppContext.jsx";
import { auth } from "../firebase/firebase-auth.js";

export const RoomsNotDisturbScreen = React.memo(() => {
  const [rooms, setRooms] = React.useState([]);

  const user = React.useContext(AppContext);

  React.useEffect(() => {
    if (user) {
      auth.currentUser.getIdToken().then((token) => {
        RoomApi.getRoomWithCheckInData(token).then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            const roomsTemp = [];
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              const checkinData = element.checkin_data;
              if (checkinData.length === 0) {
                continue;
              } else if (checkinData[checkinData.length - 1]?.not_disturb) {
                roomsTemp.push(data[index]);
              }
            }
            setRooms(roomsTemp);
          }
        });
      });
    }
  }, [user]);

  React.useEffect(() => {
    document.title = "Rogo Solutions - Rooms Not Disturb";
  }, []);

  return (
    <Container navActivate="not-disturb">
      <div className="flex flex-row">
        <div className="block w-full">
          <div className="flex flex-row justify-between p-[16px]">
            <button
              className="bg-[#212529] w-[48px] h-[48px] rounded-md shadow-md drop-shadow-md"
              onClick={() => {
                history.back();
              }}
            >
              <i className="fa-solid fa-left-long text-white"></i>
            </button>
          </div>
          <div className="flex flex-col items-center my-[32px]">
            {(() => {
              if (rooms.length == 0) {
                return (
                  <p className="text-[#212529] tracking-[4px] my-[64px] text-[32px]">
                    NOT FOUND ROOM
                  </p>
                );
              } else {
                return rooms?.map((room, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="w-[600px] flex flex-row justify-between p-[16px] shadow-md bg-white drop-shadow-md rounded-md">
                        <div className="flex flex-col">
                          <p className="tracking-[4px] text-[48px] font-bold text-[#212529]">{room.name}</p>
                          <p className="text-[#212529] text-[18px] tracking-[4px]">{`${room?.checkin_data[room?.checkin_data?.length - 1]?.time_not_disturb}M`}</p>
                        </div>
                        <div></div>
                      </div>
                    </React.Fragment>
                  );
                });
              }
            })()}
          </div>
        </div>
      </div>
    </Container>
  );
});
