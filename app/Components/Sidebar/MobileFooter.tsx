"use client";

import UseConversation from "@/app/Hooks/UseConversation";
import useRoutes from "@/app/Hooks/useRoutes";
import MobileItem from "./MobileItem";
import Avatar from "../Avatar";
import { User } from "@prisma/client";
import { useState } from "react";
import SettingsModal from "./SettingsModal";

interface MobileFooterProps {
  currentUser: User;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const { isOpen } = UseConversation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (isOpen) {
    return null;
  }

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
        <div
          onClick={() => setIsSettingsOpen(true)}
          className="px-4 hover:opacity-75 cursor-pointer transition"
        >
          <Avatar user={currentUser} />
        </div>
        {routes.map((route) => (
          <MobileItem
            key={route.label}
            href={route.href}
            label={route.label}
            icon={route.icon}
            active={route.active}
            onClick={route.onClick}
          />
        ))}
      </div>
    </>
  );
};

export default MobileFooter;
