import React from "react";
import { RoomApi } from "../api/room-api.js";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext.jsx";
import { Container } from "../components/Container.jsx";
import { auth } from "../firebase/firebase-auth.js";
import { RoomInfo } from "../components/RoomInfo.jsx";
import { CardRoom } from "../components/CardRoom.jsx";
import { Box, Button, Dialog, Menu, MenuItem } from "@mui/material";
import PhongDangSuDung from "../assets/phong-dang-su-dung.png";
import PhongDatTruoc from "../assets/phong-dat-truoc.png";
import PhongTrong from "../assets/phong-trong.png";
import { ContainerCounterRoom } from "../components/ContainerCounterRoom.jsx";
import { LoadingRoomInfo } from "../components/LoadingRoomInfo.jsx";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [loading, setLoading] = React.useState(true);

  const [rooms, setRooms] = React.useState();
  const [room, setRoom] = React.useState();
  const [roomEmpty, setRoomEmpty] = React.useState(0);
  const [roomUsed, setRoomUsed] = React.useState(0);
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
          let __roomEmpty = 0;
          let __roomUsed = 0;
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
            if (element?.is_available) {
              __roomEmpty++;
            } else {
              __roomUsed++;
            }
          }
          setRoom(roomTemp);
          setMaxFloor(temp);
          setRooms(roomsMap);
          setRoomEmpty(__roomEmpty);
          setRoomUsed(__roomUsed);
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
      <Dialog
        open={room != null}
        onClose={() => {
          setRoom(null);
        }}
        maxWidth={"xl"}
        PaperComponent={Box}
      >
        <RoomInfo
          room={room}
          onExit={() => {
            setRoom(null);
          }}
        />
      </Dialog>
      <div className="flex flex-row justify-between mt-[65px] mx-[38px]">
        <ContainerCounterRoom
          text="Đang sử dụng"
          counter={roomUsed}
          fill="bg-[#E92A35]"
          backgroundImage={PhongDangSuDung}
        />
        <ContainerCounterRoom
          text="Đặt trước"
          counter={1}
          fill="bg-[#F09819]"
          backgroundImage={PhongDatTruoc}
        />
        <ContainerCounterRoom
          text="Đang trống"
          counter={roomEmpty}
          fill="bg-[#5EAA4A]"
          backgroundImage={PhongTrong}
        />
      </div>
      <LoadingRoomInfo loading={loading} />

      <div className="flex flex-row justify-start mx-[38px] items-center mt-[73px]">
        <p className="text-[#B9B9B9] text-[25.7112px] font-semibold mr-[31px]">
          Chọn tầng
        </p>
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {`Tầng ${floor}`}
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {[...Array(maxFloor + 1).keys()].map((value) => {
            if (value != 0) {
              return (
                <MenuItem
                  key={value}
                  onClick={() => {
                    handleClose();
                    window.location = `#/?floor=${value}`;
                  }}
                >{`Tầng ${value}`}</MenuItem>
              );
            }
          })}
        </Menu>
      </div>

      {(() => {
        if (rooms?.get(floor)) {
          return (
            <section className="my-[32px]">
              <div className="grid grid-cols-3 gap-y-[38px] place-items-center">
                {rooms?.get(floor)?.map((roomFor, index) => {
                  return (
                    <React.Fragment key={index}>
                      <CardRoom
                        room={roomFor}
                        onSelectedItem={() => {
                          setRoom(roomFor);
                        }}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            </section>
          );
        } else if (!loading) {
          return (
            <div className="w-full h-[504px] justify-center items-center flex">
              <p className="text-[24px] tracking-[4px] text-white">
                {`NOT FOUND ROOM IN FLOOR ${floor}`}
              </p>
            </div>
          );
        }
      })()}
    </Container>
  );
});
