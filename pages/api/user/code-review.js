import nc from "next-connect";
import { getSession } from "next-auth/client";
import { connectToDB, submitUserCodeReview } from "../../../database";
import { send } from "micro";

const handler = nc().post(async (req, res) => {
  const { db } = await connectToDB();
  const userSession = await getSession({ req });
  const { projectSlug, phase, pullRequestUrl } = req.body;

  if (!projectSlug || !phase || !pullRequestUrl) {
    res.status(400).send("Invalid code review schema!");
  }

  if (userSession?.user?.userId) {
    try {
      const result = await submitUserCodeReview({
        db,
        userId: userSession.user.userId,
        data: { projectSlug, phase, pullRequestUrl },
      });

      res.status(200).send(result.ops[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(401).send("Unauthorized: please login to submit a code review");
  }
});

export default handler;
