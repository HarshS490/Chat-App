import MessageInput from "@/components/conversation/MessageInput";
import getConverSationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import Body from "@/components/conversation/Body";
import Header from "@/components/conversation/Header";
import { Suspense } from "react";
import Loading from "../Loading";
import toast from "react-hot-toast";
interface Params {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: Params }) => {
  const conversation = await getConverSationById(params.conversationId);
  // const messages = await getMessages(params.conversationId);
  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <EmptyState></EmptyState>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Suspense fallback={<Loading />}>
          <Header conversation={conversation}></Header>
          {/* render the messages here */}

          <Body ></Body>

          {/* send messages */}
          <MessageInput></MessageInput>
        </Suspense>
      </div>
    </div>
  );
};

export default ConversationId;
