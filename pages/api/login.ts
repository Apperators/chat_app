import type { User } from "./user";

import { withSessionRoute } from "../../lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username } = await req.body;

  try {
    const user: User = { isLoggedIn: true, username };
    req.session.user = user;
    await req.session.save();
    // save user to db
    await prisma.user.create({
      data: {
        name: user.username,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
