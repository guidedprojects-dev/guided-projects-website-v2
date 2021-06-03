import nc from "next-connect";
import { getSession } from "next-auth/client";
import {
  connectToDB,
  queryUserProjectCodeReviews,
  submitUserCodeReview,
} from "../../../../database";

const handler = nc()
  .post(async (req, res) => {
    const { db } = await connectToDB();
    const { slug: projectSlug } = req.query;
    const { phase, pullRequestUrl } = req.body;
    const userSession = await getSession({ req });

    if (!projectSlug || !phase || !pullRequestUrl) {
      res.status(400).send("Invalid code review schema!");
    }

    if (userSession?.user?.userId) {
      try {
        const currentCodeReviews = await queryUserProjectCodeReviews({
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
            .send(`Code review for "${phase}" already in progress.`);
        }

        const result = await submitUserCodeReview({
          db,
          userId: userSession.user.userId,
          // Status 0 means "in progress"
          data: { projectSlug, phase, pullRequestUrl, status: 0 },
        });

        return res.status(201).send(result.ops[0]);
      } catch (error) {
        return res
          .status(500)
          .send("Error submitting code review. Please try again later");
      }
    } else {
      return res
        .status(401)
        .send("Unauthorized: please login to submit a code review");
    }
  })
  .get(async (req, res) => {
    const { db } = await connectToDB();
    const { slug: projectSlug } = req.query;
    const userSession = await getSession({ req });

    if (!userSession) {
      return res
        .status(401)
        .send("Unauthorized: please login to view your code reviews");
    }

    try {
      const codeReviews = await queryUserProjectCodeReviews({
        db,
        userId: userSession.user.userId,
        projectSlug,
      });
      res.status(200).send(codeReviews);
    } catch (error) {
      console.log(`error`, error);
      return res.status(500).send("Error retreiving code reviews");
    }
  });

export default handler;
