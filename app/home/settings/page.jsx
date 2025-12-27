"use client";

import ThemeLink from "@/app/_components/ThemeLink";
import GoBackSVG from "@/app/_svgs/GoBackSVG";
import SettingItem from "./_components/SettingItem";
import SectionTitle from "../../_components/SectionTitle";
import PageTitle from "../../_components/PageTitle";
import ThemeBtn from "@/app/_components/ThemeBtn";
import { redirect } from "next/navigation";

const settings_list = [
  {
    name: "Theme",
    selected: 1,
    options: [{ text: "dark" }, { text: "light" }],
  },
  {
    name: "Language",
    selected: 0,
    options: [{ text: "eng" }, { text: "cn" }],
  },
];

export default function Settings() {
  const handleSave = () => redirect("/home");

  return (
    <div className="container-md grid w-[600px] gap-4 rounded-sm p-4">
      <div className="flex items-center justify-between">
        <ThemeLink href="/home" className="px-2 py-1">
          HOME <GoBackSVG />
        </ThemeLink>
        <PageTitle>Settings</PageTitle>
      </div>
      <div className="grid gap-2">
        <SectionTitle>Preferences</SectionTitle>
        <div className="grid gap-4">
          {settings_list.map((item, index) => (
            <SettingItem key={index} name={item.name} initSelect={item.selected} options={item.options} />
          ))}
        </div>
      </div>
      <div className="grid gap-2">
        <SectionTitle>Password</SectionTitle>
        <div className="border-dark rounded-sm border-2 px-4 py-2 text-xl">
          <div>
            <span className="font-semibold">Current Password</span>
          </div>
          <div className="bg-dark my-1 h-0.5 w-full rounded-full" />
          <div>
            <div className="flex justify-between">
            <span className="font-semibold">Current Password</span>
              <input className="" placeholder="Current Password" />
            </div>
            <input className="" placeholder="New Password" />
          </div>
        </div>
        <ThemeBtn onClick={handleSave}>Logout Account</ThemeBtn>
      </div>
    </div>
  );
}
