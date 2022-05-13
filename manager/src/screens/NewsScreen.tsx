import React from "react";
import { HeaderNav } from "../components/HeaderNav";
import BreadcrumbBg from "../assets/breadcrumb-bg.jpg";

export const NewsScreen = React.memo(() => {
    return (
        <React.Fragment>
            <HeaderNav navActive="news" />
            <section
                className="h-[360px] flex flex-col justify-center items-center"
                style={{
                    backgroundImage: `url(${BreadcrumbBg})`,
                }}
            >
                <p className="text-white text-[64px] font-normal tracking-widest">
                    Blog
                </p>
                <div className="flex flex-row items-center text-[18px] font-light">
                    <a href="/" className="text-white ">
                        <p className="mx-[8px] inline">{"Home\\"}</p>
                    </a>
                    <p className="text-[#777c81]">Blog</p>
                </div>
            </section>
        </React.Fragment>
    );
});
