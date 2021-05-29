export function submitUserCodeReview({ db, userId, data }) {
  return db.collection("code-reviews").insertOne({
    userId,
    submittedAt: new Date(),
    ...data,
  });
}

export async function queryUserProjectCodeReviews({
  db,
  userId,
  projectSlug,
  phase,
  status,
  sortField = "submittedAt",
  sortDir = "desc",
}) {
  const query = {
    userId,
    projectSlug,
  };

  const options = {
    sort: {
      [sortField]: sortDir.toLocaleLowerCase() === "desc" ? -1 : 1,
    },
  };

  if (status) query.status = status;
  if (phase) query.phase = phase;

  let codeReviews = [];
  const cursor = await db.collection("code-reviews").find(query, options);
  await cursor.forEach((item) => {
    codeReviews.push(item);
  });
  await cursor.close();

  return codeReviews;
}

export function getUserCodeReviewList({ db, userId, projectSlug }) {}
