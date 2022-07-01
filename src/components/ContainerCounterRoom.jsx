import React from "react";

export function ContainerCounterRoom({ backgroundImage, counter, text, fill }) {
  return (
    <div
      className={`w-[323px] h-[102px] font-bold text-center bg-cover bg-no-repeat leading-[102px] rounded-[38.57px]`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <p
        className={`rounded-[38.57px] opacity-90 ${fill} uppercase text-white text-[26px]`}
      >{`${text}: ${counter}`}</p>
    </div>
  );
}
