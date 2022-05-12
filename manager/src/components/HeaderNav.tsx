import React from "react";
import Logo from "../assets/logo.png";

export const HeaderNav = React.memo(
    ({
        navActive,
    }: {
        navActive?: "news" | "home" | "dashboard" | "about" | "contact";
    }) => {
        const NAV_LINK_ACTIVE =
            "text-base font-medium px-[16px] py-[12px] mx-[24px] text-[#FFC764]";

        const NAV_LINK_NORMAL =
            "text-base font-medium px-[16px] py-[12px] mx-[24px] hover:text-[#FFC764] text-white duration-200";

        const navClassName = (
            nav: "news" | "home" | "dashboard" | "about" | "contact"
        ) => {
            if (nav === navActive) {
                return NAV_LINK_ACTIVE;
            }
            return NAV_LINK_NORMAL;
        };

        return (
            <header className="h-[86px] w-auto bg-[#212529] items-center flex-row flex px-[156px] justify-between sticky top-0">
                <a className="h-[48px] flex flex-row items-center" href="/">
                    <img
                        src={Logo}
                        alt="Banner"
                        className="w-[48px] h-[48px]"
                    />
                    <p className="text-[24px] text-[#FFC764] font-bold mx-[8px]">
                        Rogo
                    </p>
                </a>
                <nav>
                    <a href="/" className={navClassName("home")}>
                        Home
                    </a>
                    <a href="/dashboard" className={navClassName("dashboard")}>
                        Dashboard
                    </a>
                    <a href="/about" className={navClassName("about")}>
                        About Us
                    </a>

                    <a href="/news" className={navClassName("news")}>
                        News
                    </a>

                    <a href="/contact" className={navClassName("contact")}>
                        Contact
                    </a>

                    <a
                        href="/book"
                        className="bg-white rounded-sm shadow-sm px-[16px] py-[12px] text-lg font-semibold"
                    >
                        Book Now
                        <i className="fa-solid fa-arrow-right-long mx-[8px] text-[#FFC764] text-lg" />
                    </a>
                </nav>
            </header>
        );
    }
);
