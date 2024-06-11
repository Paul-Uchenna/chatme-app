import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftEndOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import UseConversation from "./UseConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = UseConversation();
  const routes = useMemo(
    () => [
      {
        label: "chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: HiArrowLeftEndOnRectangle,
      },
    ],
    [pathname, conversationId]
  );
  return routes;
};

export default useRoutes;
