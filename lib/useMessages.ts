import useSWR from "swr";
import type { User } from "../pages/api/user";
import { MessageType } from "../components/Message";

export default function useMessages(user: User | undefined) {
  // We do a request to /api/events only if the user is logged in
  const { data: messages = [] } = useSWR<MessageType[]>(
    user?.isLoggedIn ? `/api/messages` : null
  );

  return { messages };
}
