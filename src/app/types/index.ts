import { Conversation,User,Message, FriendRequest } from "@prisma/client";

export type FullMessageType = Message&{
  sender: User,
  seen:User[]
}

export type FullConversationType = Conversation&{
  users:User[],
  messages:FullMessageType[],
}

export type minimalUser = {
  name: string;
  id: string;
  email: string;
  image: string | null;
}
export type FullRequestType =FriendRequest&{
  sender:minimalUser,
  receiver:minimalUser,
}