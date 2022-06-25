import React from "react";
import { RoomApi } from "../api/room-api.js";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext.jsx";
import { Container } from "../components/Container.jsx";
import { auth } from "../firebase/firebase-auth.js";
import DoNotDisturbMode from "../assets/do-not-disturb-mode.svg";
import { DialogContainer } from "../components/DialogContainer.jsx";
import { RoomInfo } from "../components/RoomInfo.jsx";
import { CardRoom } from "../components/CardRoom.jsx";
export class UpdateStatusRoom {
  hasChange;
  notify;

  constructor(hasChange, notify) {
    this.hasChange = hasChange;
    this.notify = notify;
  }

  onChange = (locationId) => {
    this.hasChange();
    this.notify(locationId);
  };
}

/**
 * @type {UpdateStatusRoom}
 */
export var updateStatusRoom;

export const HomeScreen = React.memo(() => {
  const [searchParams] = useSearchParams();
  const floor = parseInt(searchParams.get("floor") ?? "1");
  const locationId = searchParams.get("locationId");

  const [loading, setLoading] = React.useState(true);

  const [rooms, setRooms] = React.useState();
  const [room, setRoom] = React.useState();
  const [maxFloor, setMaxFloor] = React.useState(0);
  const user = React.useContext(AppContext);

  const loadDataRoom = () => {
    auth.currentUser.getIdToken().then(async (token) => {
      await RoomApi.getRoomWithCheckInData(token).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          const roomsMap = new Map();
          let roomTemp = null;
          let temp = 0;
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (locationId) {
              if (element.rogo_location_id === locationId) {
                roomTemp = element;
              }
            }
            if (element?.floor > temp) {
              temp = element?.floor;
            }
            if (roomsMap.get(element?.floor)) {
              roomsMap.get(element?.floor).push(element);
            } else {
              roomsMap.set(element?.floor, [element]);
            }
          }
          setRoom(roomTemp);
          setMaxFloor(temp);
          setRooms(roomsMap);
        }
      });
    });
  };

  React.useEffect(() => {
    if (user) {
      loadDataRoom();
      setLoading(false);
      updateStatusRoom = new UpdateStatusRoom(
        () => {
          loadDataRoom();
        },
        (lId) => {
          if (locationId === lId) {
            window.location = `#/?floor=${floor}&locationId=${lId}`;
          }
        }
      );
    }
  }, [floor, user]);

  React.useEffect(() => {
    document.title = "Rogo Solutions - Home";
  }, []);

  return (
    <Container navActivate="home">
      <section
        className={(() => {
          if (room) {
            return "lg:mx-[60px] 2xl:mx-[100px] mt-[40px]";
          }
        })()}
      >
        {(() => {
          if (room) {
            return (
              <DialogContainer zIndex="z-20" backgroundColor="bg-transparent">
                <RoomInfo room={room} />
              </DialogContainer>
            );
          }
        })()}
      </section>
      {(() => {
        if (loading) {
          return (
            <div className="w-full h-[504px] justify-center items-center flex">
              <svg
                role="status"
                className="w-[48px] h-[48px] mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-blue-400"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          );
        }
      })()}

      {(() => {
        if (rooms?.get(floor)) {
          return (
            <section className="lg:mx-[60px] 2xl:mx-[100px] mx-[20px] my-[32px]">
              <div className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-[16px] gap-y-[12px]">
                {rooms?.get(floor)?.map((roomFor, index) => {
                  return (
                    <React.Fragment key={index}>
                      <CardRoom room={roomFor} />
                    </React.Fragment>
                  );
                })}
              </div>
            </section>
          );
        } else if (!loading) {
          return (
            <div className="w-full h-[504px] justify-center items-center flex">
              <p className="text-[24px] tracking-[4px] text-[#212529]">
                {`NOT FOUND ROOM IN FLOOR ${floor}`}
              </p>
            </div>
          );
        }
      })()}

      <div className="flex flex-row justify-center items-center my-[32px] ">
        <button
          className="text-[#212529] mx-[16px] disabled:opacity-60"
          onClick={() => {
            if (floor > 1) {
              if (locationId) {
                window.location = `#/?floor=${
                  floor - 1
                }&locationId=${locationId}`;
              } else {
                window.location = `#/?floor=${floor - 1}`;
              }
            }
          }}
          disabled={!(floor > 1)}
        >
          <i className="fa-solid fa-arrow-left-long" />
        </button>
        <div className="bg-[#212529] w-[48px] h-[48px] rounded-md shadow-md drop-shadow-md">
          <p className="text-white text-center leading-[48px] text-[18px] font-bold">
            {floor}
          </p>
        </div>
        <button
          className="text-[#212529] mx-[16px] disabled:opacity-60"
          onClick={() => {
            if (floor < maxFloor) {
              if (locationId) {
                window.location = `#/?floor=${
                  floor + 1
                }&locationId=${locationId}`;
              } else {
                window.location = `#/?floor=${floor + 1}`;
              }
            }
          }}
          disabled={!(floor < maxFloor)}
        >
          <i className="fa-solid fa-arrow-right-long" />
        </button>
      </div>
    </Container>
  );
});
