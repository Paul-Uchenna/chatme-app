import Sidebar from "../Components/Sidebar/Sidebar";
import getConversations from "../actions/getConversations";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    <Sidebar>
      <ConversationList initialItem={conversations} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
