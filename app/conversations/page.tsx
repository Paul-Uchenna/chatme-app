"use client";

import clsx from "clsx";
import UseConversation from "../Hooks/UseConversation";
import EmptyState from "../Components/EmptyState";

const Home = () => {
  const { isOpen } = UseConversation();

  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default Home;
