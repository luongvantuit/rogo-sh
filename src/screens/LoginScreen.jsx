import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/firebase-auth";

export const LoginScreen = React.memo(() => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <div className="flex flex-col justify-center items-center">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    signInWithEmailAndPassword(auth, email, password).then(
                        (cre) => {
                            if (cre.user) {
                                window.location = "#/";
                            }
                        }
                    );
                }}
                className="w-[360px] flex flex-col p-[16px] my-[48px] shadow-md"
            >
                <p className="tracking-[4px] font-bold text-[36px] text-center">
                    LOGIN
                </p>
                <input
                    type="text"
                    placeholder="Email"
                    className="placeholder-gray-600 p-[8px] border-2 border-[#FFC764] focus:bottom-0 my-[8px] focus:ring-[#FBD083] focus:ring-2 outline-none tracking-widest"
                    onChange={(event) => {
                        setEmail(event.currentTarget.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="placeholder-gray-600 p-[8px] border-2 border-[#FFC764] focus:bottom-0 my-[8px] focus:ring-[#FBD083] focus:ring-2 outline-none tracking-widest"
                    onChange={(event) => {
                        setPassword(event.currentTarget.value);
                    }}
                />
                <button
                    type="submit"
                    className="text-[#212529] tracking-[4px] bg-[#FFC764] py-[12px] my-[16px]"
                >
                    LOGIN
                </button>
            </form>
        </div>
    );
});
