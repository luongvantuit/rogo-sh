import React from "react";
import { Header } from "../components/Header";
import { HeaderNav } from "../components/HeaderNav";
import Hero from "../assets/hero.jpg";
import HomeAbout from "../assets/home-about.png";

export const HomeScreen = React.memo(() => {
    return (
        <React.Fragment>
            <Header />
            <HeaderNav navActive="home" />
            <section
                className="w-auto h-[800px] bg-cover bg-no-repeat justify-center items-center flex flex-col px-[156px] py-[86px]"
                style={{
                    backgroundImage: `url(${Hero})`,
                }}
            >
                <p className="text-[#FFC764] font-normal text-lg tracking-widest my-[64px]">
                    WELCOME TO ROGO
                </p>
                <p className="text-white font-bold text-7xl w-[960px] text-center">
                    Experience the greatest for you holidays.
                </p>
            </section>
            <section className="my-[-80px] mx-[156px] flex flex-row justify-between">
                <div className="py-[156px] flex flex-col px-[32px]">
                    <p className="text-[#FFC764] font-medium text-lg">
                        ABOUT US
                    </p>
                    <p className="text-5xl font-normal my-[24px]">
                        Welcome to Rogo - Manager rooms
                    </p>
                </div>
                <img src={HomeAbout} alt="Home about" />
            </section>
        </React.Fragment>
    );
});
