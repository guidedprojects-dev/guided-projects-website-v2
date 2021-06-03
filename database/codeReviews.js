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

export function getUserCodeReviewList({ db, query, options }) {}

export async function queryCodeReviews({
  db,
  query,
  options,
  from = 0,
  size = 20,
}) {
  let codeReviews = [];

  const cursor = await db
    .collection("code-reviews")
    .find(query, options)
    .skip(from)
    .limit(size);
  const total = await cursor.count();
  await cursor.forEach((item) => {
    codeReviews.push(item);
  });
  await cursor.close();

  const next = from + size >= total ? null : from + size;

  return {
    codeReviews,
    next,
    total,
  };
}
