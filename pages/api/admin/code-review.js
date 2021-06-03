import nc from "next-connect";
import { getSession } from "next-auth/client";
import { connectToDB, queryCodeReviews } from "../../../database";

import { ADMIN_ROLE } from "../../../utils/constants";

const handler = nc().get(async (req, res) => {
  const { db } = await connectToDB();
  const userSession = await getSession({ req });

  let status;
  let sortDir = -1;
  let from;
  let size;
  const sortField = req.query.sortField || "submittedAt";

  if (req.query.sortDir !== undefined)
    sortDir = parseInt(req.query.sortDir, 10);
  if (req.query.status !== undefined) status = parseInt(req.query.status, 10);
  if (req.query.from !== undefined) from = parseInt(req.query.from, 10);
  if (req.query.size !== undefined) size = parseInt(req.query.size, 10);

  const query = {};
  const options = {
    sort: {
      [sortField]: sortDir,
    },
  };

  if (status !== undefined) query.status = status;

  if (!userSession || !userSession?.user?.role === ADMIN_ROLE) {
    return res
      .status(401)
      .send("Unauthorized: user must be an admin to access this route");
  }

  try {
    const response = await queryCodeReviews({
      db,
      query,
      options,
      from,
      size,
    });
    return res.status(200).send(response);
  } catch (error) {
    console.log(`error`, error);
    return res.status(500).send("Error querying code reviews");
  }
});

export default handler;
