import React from "react";

export function ContainerCounterRoom({ backgroundImage, counter, text, fill }) {
  return (
    <div
      className={`2xl:w-[323px] xl:w-[264px] w-[220px] 2xl:h-[102px] xl:h-[86px] h-[72px] font-bold text-center bg-cover bg-no-repeat 2xl:leading-[102px] xl:leading-[86px] leading-[72px] 2xl:rounded-[38.57px] xl:rounded-[29.34px] rounded-[24.12px]`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <p
        className={`2xl:rounded-[38.57px] xl:rounded-[29.34px] rounded-[24.12px] opacity-90 ${fill} uppercase text-white 2xl:text-[26px] xl:text-[20px] text-[16px]`}
      >{`${text}: ${counter}`}</p>
    </div>
  );
}
