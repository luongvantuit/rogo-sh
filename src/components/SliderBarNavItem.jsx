import React from "react";

export const SliderBarNavItem = React.memo(({ activate, icon, text, href }) => {

  return (
    <a
      href={href}
      className={`text-center md:justify-start justify-center md:w-auto w-[48px] flex flex-row items-center mx-[16px] mb-[16px] duration-500 text-white md:px-[16px] h-[48px] p-0 ${(() => {
        if (activate) {
          return "rounded-md shadow-md bg-[#212529]";
        }
        return "hover:rounded-md hover:shadow-md hover:drop-shadow-md";
      })()}`}
    >
      <i className={`${icon} text-[16px] leading-[48px]`}></i>
      <p className="hidden pl-[16px] md:block duration-500 font-medium text-[16px]">
        {text}
      </p>
    </a>
  );
});
