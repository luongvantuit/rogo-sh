import React from "react";
export const SliderBarNavItemFooter = React.memo(({ color, text }) => {
  return (
    <span className="text-center md:justify-start justify-center md:w-auto w-[48px] flex flex-row items-center mx-[16px] duration-500 text-white md:px-[16px] h-[48px] p-0">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" r="10" fill={color} />
      </svg>

      <p className="hidden pl-[8px] md:block duration-500 text-[16px]">
        {text}
      </p>
    </span>
  );
});
