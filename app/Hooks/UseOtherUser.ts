import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { FullConversationType } from "../types";

const UseOtherUser = (
  conversatoin: FullConversationType | { users: User[] }
) => {
  const session = useSession();
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;
    const otherUser = conversatoin.users.filter(
      (user) => user.email !== currentUserEmail
    );

    return otherUser;
  }, [session?.data?.user?.email, conversatoin.users]);

  return otherUser[0];
};

export default UseOtherUser;
