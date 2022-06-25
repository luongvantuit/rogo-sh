import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/firebase-auth";
import Logo from "../assets/logo.svg";
import Google from "../assets/google.svg";
import Apple from "../assets/apple.svg";

export const LoginScreen = React.memo(() => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <img
        src={Logo}
        alt="Logo banner - Rogo Solutions"
        className="w-[86.39px] h-[130.85px]"
      />
      <p className="font-medium text-white text-[30.65px] py-[16px]">
        Chào mừng đến với Rogo Hotel!
      </p>
    
      <form
        onSubmit={(event) => {
          event.preventDefault();
          signInWithEmailAndPassword(auth, email, password).then((cre,r) => {
            if (cre.user) {
              window.location = "#/";
            };
          }).catch(e=>{
            console.log(e);
          });
        }}
        className="w-[560px] flex flex-col"
      >
        <p className="font-semibold text-[30.65px] text-white">Đăng nhập</p>
        <input
          type="text"
          placeholder="Email"
          className="placeholder-gray-300 bg-inherit h-[30px] text-white py-[16px] my-[8px] focus:outline-none border-b-[1px] border-gray-300"
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="placeholder-gray-300 bg-inherit h-[30px] text-white py-[16px] my-[8px] focus:outline-none border-b-[1px] border-gray-300"
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
        <div className="flex justify-end">
          <a href="#" className="text-white">
            Quên mật khẩu?
          </a>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-white text-[30.6474px]">Đăng nhập với</p>
            <div className="flex flex-row mx-[32px] my-[16px]">
              <img
                src={Google}
                alt="Google Inc."
                className="w-[48px] h-[48px]"
              />
              <img src={Apple} alt="Apple Inc." className="w-[48px] h-[48px]" />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-[#FF7459] my-[16px] rounded-lg font-normal py-[11px] px-[38px] text-[25px] h-[51px] justify-center items-center flex"
          >
            Đăng nhập
            <i className="fa-solid fa-arrow-right text-white ml-[16px]"></i>
          </button>
        </div>
      </form>
    </div>
  );
});
