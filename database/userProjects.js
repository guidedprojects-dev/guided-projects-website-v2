export function getUserProjectList(db, userId) {
  return db.collection("user-projects").find({ userId }).toArray();
}

export function getUserProjectByProjectId(db, userId, projectId) {
  return db.collection("user-projects").findOne({ userId, projectId });
}
