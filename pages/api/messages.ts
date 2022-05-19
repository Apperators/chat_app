import { Message, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { MessageType } from "../../components/Message";
import prisma from "../../lib/prisma";
import { withSessionRoute } from "../../lib/withSession";

export default withSessionRoute(messagesRoute);

async function messagesRoute(
  req: NextApiRequest,
  res: NextApiResponse<MessageType[]>
) {
  const user = req.session.user;

  if (!user || user.isLoggedIn === false) {
    res.status(401).end();
    return;
  }

  try {
    const msgs = await prisma.message.findMany({
      include: {
        author: true,
      },
    });

    const messages = msgs.map((msg: Message & { author: User }) => ({
      ...msg,
      createdAt: msg.createdAt.toISOString(),
      updatedAt: msg.updatedAt.toISOString(),
      author: {
        ...msg.author,
        email: msg.author.email || "",
        createdAt: msg.author.createdAt.toISOString(),
        updatedAt: msg.author.updatedAt.toISOString(),
      },
    }));

    res.json(messages);
  } catch (error) {
    res.status(200).json([]);
  }
}
