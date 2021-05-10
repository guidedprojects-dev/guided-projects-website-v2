import { Object } from "mongodb";
export function getUserProjectList(db, userId) {
  return db.collection("user-projects").find({ userId }).toArray();
}

export function getUserProjectByProjectId(db, userId, projectId) {
  return db
    .collection("user-projects")
    .find({ userId: Object(userId), projectId: Object(projectId) });
}
