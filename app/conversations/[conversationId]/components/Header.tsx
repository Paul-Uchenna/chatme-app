"use client";

import Avatar from "@/app/Components/Avatar";
import UseOtherUser from "@/app/Hooks/UseOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/Components/AvatarGroup";
import UseActiveList from "@/app/Hooks/UseActiveList";

interface HeaderProps {
  conversation: Conversation & { users: User[] };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = UseOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = UseActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.IsGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full flex border-b-[1px] sm-px-4 py-3 px-4 lg:px-6 items-center justify-between shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-purple-500 hover:text-purple-600 transition cursor-pointer"
          >
            <HiChevronLeft />
          </Link>
          {conversation.IsGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            {conversation.name || otherUser.name}
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>

        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-purple-500 transition cursor-pointer hover:text-purple-600"
        />
      </div>{" "}
    </>
  );
};

export default Header;
