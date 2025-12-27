"use client";

import { useState } from "react";
import SectionTitle from "@/app/_components/SectionTitle";
import ThemeBtn from "@/app/_components/ThemeBtn";
import GameTitle from "../_components/GameTitle";
import PageTitle from "../_components/PageTitle";
import InputBox from "./_components/inputBox";
import { getSocket } from "@/utils/socket";
import { redirect } from "next/navigation";
import { set_player_profile } from "@/actions/actions";

const socket = getSocket();

export default function LoginArea() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    socket.emit("user-login", email, password, (status, info) => {
      if (status === 200) {
        set_player_profile(info.username, info.avatar, info.bank, info.uuid).then(() => {
          redirect("/home");
        });
      } else {
        console.log(status);
      }
    });
  };

  const onSignUp = () => {
    socket.emit("user-signup", email, password, (status, uuid) => {
      if (status === 200) {
        set_player_profile("New Comer", "pawn", 1000, uuid).then(() => {
          redirect("/home");
        });
      } else {
      }
    });
  };

  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-x-4">
      <GameTitle />
      <div className="container-md col-1 row-2 grid grid-rows-[repeat(4,auto)] gap-4 rounded-sm p-2 sm:col-[1/2] sm:row-[1/3] sm:p-4">
        <PageTitle className="justify-center sm:justify-start">Sign in</PageTitle>
        <div className="grid gap-2">
          <SectionTitle>Email</SectionTitle>
          <InputBox onChange={setEmail} value={email} />
        </div>
        <div className="grid gap-2">
          <SectionTitle>Password</SectionTitle>
          <InputBox onChange={setPassword} value={password} type="password" />
        </div>
        <div className="grid w-full grid-cols-2 gap-2">
          <ThemeBtn className="[&>div]:py-2" onClick={onLogin}>
            Login
          </ThemeBtn>
          <ThemeBtn className="[&>div]:py-2" onClick={onSignUp}>
            Sign Up
          </ThemeBtn>
        </div>
      </div>
    </div>
  );
}
