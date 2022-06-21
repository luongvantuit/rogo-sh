import React from "react";
import { RoomApi } from "../api/room-api.js";
import { Container } from "../components/Container.jsx";
import { AppContext } from "../contexts/AppContext.jsx";
import { auth } from "../firebase/firebase-auth.js";
import DoNotDisturb from "../assets/do-not-disturb-mode.svg";

export class UpdateStateRequest {
  onChange;

  constructor(onChange) {
    this.onChange = onChange;
  }

  hasChange() {
    this.onChange();
  }
}

/**
 * @type {UpdateStateRequest}
 */
export var updateState;

export const RoomsNotDisturbScreen = React.memo(() => {
  const [rooms, setRooms] = React.useState([]);

  const user = React.useContext(AppContext);

  const loadData = () => {
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
  };

  React.useEffect(() => {
    loadData();
    if (!updateState) {
      updateState = new UpdateStateRequest(() => {
        loadData();
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
                  const timeDoNotDisturb = new Date(
                    room?.checkin_data[
                      room?.checkin_data?.length - 1
                    ]?.time_not_disturb
                  );
                  return (
                    <React.Fragment key={index}>
                      <div className="w-[600px] flex flex-row justify-between p-[16px] shadow-md bg-white drop-shadow-md rounded-md">
                        <div className="flex flex-col">
                          <p className="tracking-[4px] text-[48px] font-bold text-[#212529]">
                            {room.name}
                          </p>
                          <div className="flex flex-row items-center">
                            <img
                              src={DoNotDisturb}
                              alt=""
                              className="w-[48px] h-[48px] mr-[8px]"
                            />
                            <p className="text-[#212529] text-[18px]">
                              {timeDoNotDisturb.toLocaleString()}
                            </p>
                          </div>
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
