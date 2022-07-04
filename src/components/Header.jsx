import React from "react";
import Logo from "../assets/logo.svg";
import { AppContext } from "../contexts/AppContext.jsx";
import { auth } from "../firebase/firebase-auth";

export const Header = React.memo(() => {
  const user = React.useContext(AppContext);

  return (
    <header className="flex flex-row h-[84px] px-[40px] sticky top-0 justify-between items-center bg-[#272B3F] z-[10]">
      <div className="flex flex-row items-center">
        <img
          src={Logo}
          alt="Logo banner - Rogo Solutions"
          className="w-[39.78px] h-[56.39px] mx-[8px]"
        />
        <p className="text-white font-bold text-[30px] select-none">
          Rogo Hotel
        </p>
      </div>
      <button
        onClick={async () => {
          if (user) {
            await auth.signOut();
          }
          window.location = "#/login";
        }}
        className="text-white bg-[#212529] rounded-md py-[8px] px-[16px] hover:opacity-90 select-none"
      >
        {user ? "Đăng xuất" : "Đăng nhập"}
      </button>
    </header>
  );
});
