"use client";

import { useEffect, useState } from "react";
import ShopSVG from "@/app/_svgs/ShopSVG";
import SettingsSVG from "@/app/_svgs/SettingsSVG";
import OnlineMatchSVG from "@/app/_svgs/OnlineMatchSVG";
import AIMatchSVG from "@/app/_svgs/AIMatchSVG";
import { read_player_profile } from "@/actions/actions";
import ThemeLink from "../_components/ThemeLink";
import GameTitle from "../_components/GameTitle";
import ProfileArea from "./_components/ProfileArea";
import { getSocket } from "@/utils/socket";
import { redirect } from "next/navigation";

const socket = getSocket();

export default function Home() {
  const [playerInfo, setPlayerInfo] = useState({
    username: "Loading...",
    avatar: undefined,
    playerBank: 0,
  });

  useEffect(() => {
    read_player_profile().then((data) => {
      console.log(data);
      if (data) {
        setPlayerInfo({
          username: data.player_name,
          avatar: data.player_avatar,
          bank: data.player_bank,
        });
      } else {
        redirect("/signin");
      }
    });
  }, []);

  return !playerInfo.avatar ? null :  (
    <div className="m-1 grid gap-4 sm:m-4 sm:w-auto sm:grid-cols-[auto_1fr] sm:grid-rows-[1fr_auto]">
      <ProfileArea playerInfo={playerInfo} />
      <div className="col-1 row-1 sm:col-[2/3] sm:row-[1/2]">
        <GameTitle />
      </div>
      <div className="col-1 row-3 grid gap-2 sm:col-[2/3] sm:row-[2/3]">
        <ThemeLink href="/room">
          START ONLINE MATCH <OnlineMatchSVG />
        </ThemeLink>
        <ThemeLink href="/game/bots">
          START AI MATCH <AIMatchSVG />
        </ThemeLink>
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <ThemeLink href="/home/shop">
            SHOP <ShopSVG />
          </ThemeLink>
          <ThemeLink href="/home/settings">
            SETTINGS <SettingsSVG />
          </ThemeLink>
        </div>
      </div>
    </div>
  );
}
