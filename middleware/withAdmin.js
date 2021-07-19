import { getSession } from "next-auth/client";
import { ADMIN_ROLE } from "../utils/constants";

// Middleware to make sure a user accessing an api route has admin permissions
function withAdmin(handler) {
  return async function (req, res) {
    const userSession = await getSession({ req });

    if (!userSession || !userSession?.user?.role === ADMIN_ROLE) {
      return res
        .status(401)
        .send("Unauthorized: user must be an admin to access this route");
    }

    req.userSession = userSession;

    return handler(req, res);
  };
}

export default withAdmin;
