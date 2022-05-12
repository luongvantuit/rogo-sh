import React from "react";
import Logo from "../assets/logo.png";

export const Header = React.memo(() => {
    return (
        <header className="h-[48px] w-auto bg-[#212529]">
            <div className="flex flex-row items-center">
                <img src={Logo} alt="Banner" className="w-[24px] h-[24px]" />
                <p className="text-white">Rogo</p>
            </div>
            <nav></nav>
        </header>
    );
});
