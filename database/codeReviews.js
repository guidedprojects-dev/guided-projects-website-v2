export function submitUserCodeReview({ db, userId, data }) {
  return db.collection("code-reviews").insertOne({
    userId,
    ...data,
  });
}

export function getUserCodeReviewList({ db, userId, projectSlug }) {}
