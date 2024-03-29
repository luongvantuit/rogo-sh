import React from "react";
import { useParams } from "react-router-dom";
import { RoomApi } from "../networks/api/room-api.js";
// import { HeaderNav } from "../components/HeaderNav.jsx";
import { BookingApi } from "../networks/api/booking-api.js";
import { AppContext } from "../manager/contexts/AppContext.jsx";
import { auth } from "../firebase/FirebaseAuth.js";

export const CheckInRoomScreen = React.memo(() => {
  const { roomId } = useParams();

  const currentDate = (() => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" : ""}${
      date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" : ""}${date.getDate()}T${
      date.getHours() < 10 ? "0" : ""
    }${date.getHours()}:${
      date.getMinutes() < 10 ? "0" : ""
    }${date.getMinutes()}`;
  })();

  const [room, setRoom] = React.useState();
  const [timeCheckIn, setTimeCheckIn] = React.useState(currentDate);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timeCheckOut, setTimeCheckOut] = React.useState(currentDate);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [person, setPerson] = React.useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cMND, setCMND] = React.useState("");

  const user = React.useContext(AppContext);

  React.useEffect(() => {
    if (user) {
      auth.currentUser.getIdToken().then((token) => {
        RoomApi.getDetailRoom(token, roomId).then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            setRoom(data);
          }
        });
      });
    }
  }, [roomId, user]);

  return (
    <React.Fragment>
      {/* <HeaderNav /> */}
      <section className="w-auto h-[720px] bg-cover bg-no-repeat flex flex-col justify-center items-center">
        <p className="text-[#FFC764] my-[64px] font-medium tracking-[4px] text-[48px]">
          ROOM {room?.name?.toUpperCase()}
        </p>
        <form
          action=""
          className="shadow-sm flex flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            const confirm = window.confirm("Are you sure about this action?");
            if (confirm) {
              auth.currentUser.getIdToken().then((token) => {
                BookingApi.checkIn(
                  token,
                  room?.uuid,
                  new Date(timeCheckIn).toISOString(),
                  new Date(timeCheckOut).toISOString(),
                  person
                ).then(async (response) => {
                  if (response.ok) {
                    const data = await response.json();
                    window.location = `#/qrcode/${roomId}?code=${data.code}`;
                  }
                });
              });
            }
          }}
        >
          <div className="bg-white flex flex-1 flex-col p-[32px]">
            <div className="flex flex-row my-[16px]">
              <div>
                <label className="tracking-widest font-normal text-[20px] text-[#FFC764]">
                  CHECK IN
                </label>
                <br />
                <input
                  type="datetime-local"
                  className="my-[16px] px-[16px] py-[12px] border-2 rounded-none border-[#FFC764] outline-none focus:ring-[2px] focus:ring-[#FBD083] focus:rounded-sm tracking-widest text-[#212529]"
                  onChange={(event) => {
                    setTimeCheckIn(event.target.value);
                  }}
                  min={currentDate}
                  defaultValue={currentDate}
                />
              </div>
              <div className="ml-[32px]">
                <label className="tracking-widest font-normal text-[20px] text-[#FFC764]">
                  CHECK OUT
                </label>
                <br />
                <input
                  type="datetime-local"
                  className="my-[16px] px-[16px] py-[12px] border-2 rounded-none border-[#FFC764] outline-none focus:ring-[2px] focus:ring-[#FBD083] focus:rounded-sm tracking-widest text-[#212529]"
                  min={(() => {
                    if (timeCheckIn) {
                      return timeCheckIn;
                    }
                    return currentDate;
                  })()}
                  onChange={(event) => {
                    setTimeCheckOut(event.target.value);
                  }}
                  defaultValue={currentDate}
                />
              </div>

              <div className="ml-[32px]">
                <label className="tracking-widest font-normal text-[20px] text-[#FFC764]">
                  PERSON
                </label>
                <br />
                <input
                  type="number"
                  className="my-[16px] px-[16px] py-[12px] border-2 rounded-none border-[#FFC764] outline-none focus:ring-[2px] focus:ring-[#FBD083] focus:rounded-sm tracking-widest text-[#212529]"
                  min={1}
                  onChange={(event) => {
                    setPerson(parseInt(event.target.value));
                  }}
                  defaultValue={1}
                />
              </div>
            </div>
            <input
              type="text"
              name="cMND"
              id="cMND"
              placeholder="CMND/Passport Number"
              className="px-[16px] py-[12px] border-2 rounded-none border-[#FFC764] outline-none focus:ring-[2px] focus:ring-[#FBD083] focus:rounded-sm tracking-widest text-[#212529]"
              onChange={(event) => {
                setCMND(event.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-[#FFC764] text-[#212529] tracking-widest px-[16px]"
          >
            CHECK IN
          </button>
        </form>
        <a
          href="#/"
          className="w-[300px] my-[32px] px-[24px] py-[12px] rounded-sm shadow-sm text-[18px] group bg-white duration-500 flex flex-row justify-center"
        >
          <p className="inline text-[#212529] mx-[4px] tracking-widest">
            GO TO HOME
          </p>
          <i className="fa-solid fa-arrow-right-long mx-[8px] text-lg text-[#212529]" />
        </a>
      </section>
    </React.Fragment>
  );
});
