import React from "react";
import BreadcrumbBg from "../assets/breadcrumb-bg.jpg";
import { useParams, useSearchParams } from "react-router-dom";
import { RoomApi } from "../networks/api/room-api.js";
import QRCode from "react-qr-code";
import { AppContext } from "../manager/contexts/AppContext.jsx";
import { auth } from "../firebase/FirebaseAuth";

export const QrRoomScreen = React.memo(() => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();

  const [room, setRoom] = React.useState();
  const user = React.useContext(AppContext);

  React.useEffect(() => {
    if (user) {
      auth.currentUser.getIdToken().then((token) => {
        RoomApi.getDetailRoom(token, roomId).then(async (response) => {
          if (response.ok) {
            const data = (await response.json())["data"];
            setRoom(data);
          }
        });
      });
    }
  }, [room?.is_available, roomId, user]);

  React.useEffect(() => {
    if (room) {
      document.title = `Rogo Solutions - Room ${room.name}`;
    }
  }, [room]);

  return (
    <React.Fragment>
      <section
        className="h-[360px] bg-cover bg-no-repeat flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${BreadcrumbBg})`,
        }}
      >
        <p className="text-[#FFC764] text-[64px] font-bold tracking-widest uppercase">
          {`Room ${room?.name}`}
        </p>

        {(() => {
          if (room?.is_available) {
            return (
              <a
                href={`#/book/${roomId}`}
                className="flex flex-row justify-center bg-[#FFC764] my-[16px] text-white tracking-[4px] text-[24px] font-normal shadow-sm"
              >
                <p className="px-[24px] py-[12px]">BOOK FOR CUSTOMER</p>
                <span className="px-[16px] bg-[#212529] justify-center items-center flex">
                  <i className="fa-solid fa-arrow-right-long text-white text-[18px]" />
                </span>
              </a>
            );
          }
        })()}
      </section>
      <section
        className={(() => {
          if (room?.is_available) {
            return "mx-[320px] flex flex-col items-center my-[32px]";
          }
          return "mx-[320px] flex flex-col items-center mt-[-80px] mb-[32px] ";
        })()}
      >
        {(() => {
          if (!room?.is_available) {
            return (
              <React.Fragment>
                <div className="w-[300px] h-[300px] flex justify-center items-center bg-white shadow-lg">
                  <QRCode value={searchParams.get("code")} />
                </div>
              </React.Fragment>
            );
          }
        })()}
        <a
          href="#/"
          className="w-[300px] my-[32px] px-[24px] py-[12px] rounded-sm shadow-sm text-[18px] group hover:bg-[#FFC764] duration-500 flex flex-row justify-center bg-[#212529]"
        >
          <p className="inline text-white mx-[4px] tracking-widest">
            GO TO HOME
          </p>
          <i className="fa-solid fa-arrow-right-long mx-[8px] text-lg text-white" />
        </a>
      </section>
    </React.Fragment>
  );
});
