import React from "react";

export const Header = React.memo(() => {
    return (
        <header className="h-[48px] bg-white flex flex-row px-[156px] items-center justify-between">
            {
                // Show information base of hotel
            }
            <div></div>

            <div className="flex flew-row text-[#212529] text-[16px] font-medium">
                <a
                    href="/login"
                    className="px-[16px] py-[6px] hover:bg-[#FFC764] hover:text-white duration-200 rounded-sm"
                >
                    Login
                </a>
                <a
                    href="/register"
                    className="px-[16px] py-[6px] hover:bg-[#FFC764] hover:text-white duration-200 rounded-sm"
                >
                    Register
                </a>
            </div>
        </header>
    );
});
