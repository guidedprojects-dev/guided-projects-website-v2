import nc from "next-connect";
import { PrismaClient } from "@prisma/client";
import withAdmin from "../../../../../middleware/withAdmin";

const prisma = new PrismaClient();

const handler = nc().put(async (req, res) => {
  const { userSession } = req;
  const { id: reviewId } = req.query;

  try {
    const updatedReview = await prisma.codeReview.update({
      where: {
        id: parseInt(reviewId, 10),
      },
      data: {
        reviewerId: userSession.user.userId,
        status: 1,
      },
    });
    return res.json(updatedReview);
  } catch (error) {
    return res
      .status(500)
      .send(
        `Unable to claim code review. Code review with id ${reviewId} may not exist.`
      );
  }
});

export default withAdmin(handler);
