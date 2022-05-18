import React from "react";
import Logo from "../assets/logo.png";

export const HeaderNav = React.memo(({ navActive }) => {
    const NAV_LINK_ACTIVE =
        "text-base font-medium px-[16px] py-[12px] mx-[24px] text-[#FFC764]";

    const NAV_LINK_NORMAL =
        "text-base font-medium px-[16px] py-[12px] mx-[24px] hover:text-[#FFC764] text-white duration-200";

    const navClassName = (nav) => {
        if (nav === navActive) {
            return NAV_LINK_ACTIVE;
        }
        return NAV_LINK_NORMAL;
    };

    return (
        <header className="h-[86px] w-auto bg-[#212529] items-center flex-row flex px-[156px] justify-between sticky top-0">
            <a className="h-[48px] flex flex-row items-center" href="#/">
                <img src={Logo} alt="Banner" className="w-[48px] h-[48px]" />
                <p className="text-[24px] text-[#FFC764] font-semibold mx-[8px]">
                    Rogo
                </p>
            </a>
            <nav>
                <a href="#/" className={navClassName("dashboard")}>
                    Dashboard
                </a>
            </nav>
        </header>
    );
});
