export function submitUserCodeReview({ db, userId, data }) {
  return db.collection("code-reviews").insertOne({
    userId,
    ...data,
  });
}

export async function queryUserCodeReviews({
  db,
  userId,
  projectSlug,
  phase,
  status,
}) {
  const query = {
    userId,
    projectSlug,
    phase,
  };
  let codeReviews = [];

  if (status) query.status = status;

  const cursor = await db.collection("code-reviews").find(query);
  await cursor.forEach((item) => {
    codeReviews.push(item);
  });
  await cursor.close();

  return codeReviews;
}

export function getUserCodeReviewList({ db, userId, projectSlug }) {}
