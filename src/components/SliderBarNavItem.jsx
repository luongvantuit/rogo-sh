import React from "react";
import { useSelector } from "react-redux";

export const SliderBarNavItem = React.memo(({ activate, icon, text, href }) => {
    const sliderBarState = useSelector((state) => state.sliderBarState.value);

    return (
        <a
            href={href}
            className={(() => {
                if (!sliderBarState) {
                    return `text-center justify-center w-[48px] flex flex-row items-center mx-[16px] mb-[16px] duration-500 ${
                        activate ? "bg-[#212529]" : "text-white"
                    } h-[48px] p-0 ${(() => {
                        if (activate) {
                            return "rounded-md shadow-md drop-shadow-md";
                        }
                        return "hover:rounded-md hover:shadow-md hover:drop-shadow-md";
                    })()}`;
                }
                return `text-center md:justify-start justify-center md:w-auto w-[48px] flex flex-row items-center mx-[16px] mb-[16px] duration-500 ${
                    activate ? "bg-[#212529]" : "text-white"
                } md:px-[16px] h-[48px] p-0 ${(() => {
                    if (activate) {
                        return "rounded-md shadow-md drop-shadow-md";
                    }
                    return "hover:rounded-md hover:shadow-md hover:drop-shadow-md";
                })()}`;
            })()}
        >
            <i
                className={`${icon} text-[16px] ${
                    activate ? "text-white" : "text-[#212529]"
                } leading-[48px]`}
            ></i>
            <p
                className={(() => {
                    if (!sliderBarState) {
                        return "hidden";
                    }
                    return `hidden pl-[16px] md:block duration-500 font-medium text-[16px] ${
                        activate ? "text-white" : "text-[#212529]"
                    }`;
                })()}
            >
                {text}
            </p>
        </a>
    );
});
