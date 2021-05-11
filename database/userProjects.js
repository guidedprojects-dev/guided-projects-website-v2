export function getUserProjectList(db, userId) {
  return db.collection("user-projects").find({ userId }).toArray();
}

export function getUserProjectByProjectSlug(db, userId, projectSlug) {
  return db.collection("user-projects").findOne({ userId, projectSlug });
}

export function updateUserProject({ db, userId, projectSlug, data }) {
  return db.collection("user-projects").update(
    { userId, projectSlug },
    {
      $set: {
        ...data,
      },
    },
    // Create a new document if one doesn't exist
    { upsert: true }
  );
}
