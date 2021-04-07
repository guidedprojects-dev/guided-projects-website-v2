/**
 * @param {Db} db the mongo database to query
 * @param {string} id the user id to search for
 * @returns A User Object
 */
export async function getUserById(db, id) {
  return db.collection('users').findOne({ _id: id });
}
