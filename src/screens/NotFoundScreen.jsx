import React from "react";
// import { HeaderNav } from "../components/HeaderNav.jsx";
import Hero from "../assets/breadcrumb-bg.jpg";

export const NotFoundScreen = React.memo(() => {
    React.useEffect(() => {
        document.title = "Rogo Solutions - Page Not Found";
    }, []);
    return (
        <React.Fragment>
            {/* <HeaderNav /> */}
            <span
                className="h-[800px] bg-cover bg-no-repeat flex flex-col justify-center w-auto items-center"
                style={{
                    backgroundImage: `url(${Hero})`,
                }}
            >
                <p className="text-[#FFC764] my-[64px] font-medium tracking-[4px] text-[48px]">
                    404 - NOT FOUND
                </p>
                <a
                    href="#/"
                    className="bg-white px-[24px] py-[12px] rounded-sm shadow-sm text-[18px] group hover:bg-[#FFC764] duration-500"
                >
                    <p className="inline font-semibold group-hover:text-white text-[#212529] mx-[4px] tracking-widest">
                        GO TO HOME
                    </p>
                    <i className="fa-solid fa-arrow-right-long mx-[8px] text-lg group-hover:text-white text-[#212529]" />
                </a>
            </span>
        </React.Fragment>
    );
});
