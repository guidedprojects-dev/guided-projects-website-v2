import nc from "next-connect";
import { getSession } from "next-auth/client";
import { connectToDB, getUserProjectByProjectSlug } from "../../../../database";

const handler = nc().get(async (req, res) => {
  const { slug } = req.query;
  const { db } = await connectToDB();
  const userSession = await getSession({ req });

  if (userSession) {
    const project = await getUserProjectByProjectSlug(
      db,
      userSession.user.userId,
      slug
    );
    res.json(project);
  } else {
    res.status(401).send("Unauthorized: please login");
  }
});

export default handler;
