import React from "react";

export function Device({ background, text, icon, textColor = "text-white" }) {
  return (
    <React.Fragment>
      <div
        className={`${background} rounded-md h-[105px] w-[178px] flex justify-between flex-col p-[16px] mr-[16px]`}
      >
        {icon}
        <p className={`${textColor} text-[18.56px] font-medium`}>{text}</p>
      </div>
    </React.Fragment>
  );
}
