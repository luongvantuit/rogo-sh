import React from "react";

export function ContentDialogConfirm({
  content,
  onCanceled,
  onConfirm,
  textCanceled = "Huỷ",
  textConfirm = "Xác nhận",
}) {
  return (
    <div className="w-[1310px] h-[343px] flex flex-col justify-center items-center">
      <p className="inline-block text-[40px] text-white text-center">
        {content}
      </p>
      <div className="flex flex-row justify-center mt-[83px]">
        <button onClick={onCanceled}>{textCanceled}</button>
        <button onClick={onConfirm}>{textConfirm}</button>
      </div>
    </div>
  );
}
