import nc from "next-connect";
import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";
import { ADMIN_ROLE, SORT_DESC } from "../../../../utils/constants";

const prisma = new PrismaClient();

const handler = nc().get(async (req, res) => {
  const userSession = await getSession({ req });

  let status;
  let sortDir = SORT_DESC;
  let from;
  let size;
  const sortField = req.query.sortField || "submittedAt";

  // Non admins shouldn't be able to access this route
  if (!userSession || !userSession?.user?.role === ADMIN_ROLE) {
    return res
      .status(401)
      .send("Unauthorized: user must be an admin to access this route");
  }

  // We need to check types here to make sure query params were actually set properly
  if (typeof req.query.sortDir === "string") sortDir = req.query.sortDir;
  if (req.query.status !== undefined) status = parseInt(req.query.status, 10);
  if (req.query.from !== undefined) from = parseInt(req.query.from, 10);
  if (req.query.size !== undefined) size = parseInt(req.query.size, 10);

  try {
    const codeReviews = await prisma.codeReview.findMany({
      orderBy: [{ [sortField]: sortDir }],
      skip: from,
      take: size,
      where: {
        status,
      },
      include: {
        // Grab the user who submitted the code review
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return res.status(200).send({ codeReviews });
  } catch (error) {
    console.log(`error`, error);
    return res.status(500).send("Error querying code reviews");
  }
});

export default handler;
