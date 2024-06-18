import { useParams } from "next/navigation";
import { useMemo } from "react";

const UseConversation = () => {
  const params = useParams();
  const conversationId = useMemo(() => {
    if (!params) {
      return;
    }
    return params.conversationId as string;
  }, [params]); // ou params?.conversationId

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
};

export default UseConversation;
