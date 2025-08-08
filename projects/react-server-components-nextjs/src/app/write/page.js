import { AsyncDatabase } from "promised-sqlite3";

import postNote from "./postNote";

export default async function WriteNotePage() {
  async function getUsers() {
    const db = await AsyncDatabase.open("./notes.db");
    return db.all("SELECT * FROM users");
  }

  const users = await getUsers();

  return (
    <fieldset className="note-fieldset">
      <legend>Write a new note</legend>
      <form action={postNote} className="note-form">
        <label>
          From
          <select name="from-user">
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          To
          <select defaultValue={2} name="to-user">
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Note
          <textarea name="note" />
        </label>

        <button type="submit">Save</button>
      </form>
    </fieldset>
  );
}
