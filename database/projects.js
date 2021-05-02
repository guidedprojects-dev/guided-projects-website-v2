export function getProjectList(db) {
  return db.collection("guided-projects").find().toArray();
}
