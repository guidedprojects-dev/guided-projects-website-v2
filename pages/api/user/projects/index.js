import nc from "next-connect";
import { getSession } from "next-auth/client";
import { connectToDB, getUserProjectList } from "../../../../database";

const handler = nc().get(async (req, res) => {
  const { db } = await connectToDB();
  // get the session so we can query the current user's projects
  const userSession = await getSession({ req });

  if (userSession) {
    try {
      const projectList = await getUserProjectList(db, userSession.user.userId);
      res.json(projectList);
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.status(401).send("Unauthorized: please login to view your projects");
  }
});

export default handler;
