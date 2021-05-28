import nc from "next-connect";
import { getSession } from "next-auth/client";
import {
  connectToDB,
  queryUserCodeReviews,
  submitUserCodeReview,
} from "../../../database";
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
      const currentCodeReviews = await queryUserCodeReviews({
        db,
        userId: userSession.user.userId,
        projectSlug,
        phase,
        status: 0,
      });

      // if the user already has a code review in progress for this project and phase,
      // don't allow them to submit another one.
      if (currentCodeReviews.length > 0) {
        return res
          .status(409)
          .send(`Code review for ${phase} already in progress.`);
      }

      const result = await submitUserCodeReview({
        db,
        userId: userSession.user.userId,
        // Status 0 means "in progress"
        data: { projectSlug, phase, pullRequestUrl, status: 0 },
      });

      return res.status(200).send(result.ops[0]);
    } catch (error) {
      console.log(`error`, error);
      res.status(500).send(error.message);
    }
  } else {
    res.status(401).send("Unauthorized: please login to submit a code review");
  }
});

export default handler;
