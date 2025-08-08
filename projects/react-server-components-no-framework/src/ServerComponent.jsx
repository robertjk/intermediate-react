import path from "node:path";
import { AsyncDatabase } from "promised-sqlite3";

// Assumes that you are logged in as user 1
async function ServerComponent() {
  console.log("Rendering ServerComponent server component");

  async function fetchNotes() {
    console.log("Running server function fetchNotes");

    const dbPath = path.resolve(__dirname, "../notes.db");
    const db = await AsyncDatabase.open(dbPath);
    return db.all(
      `SELECT n.id as id, n.note as note, f.name as from_user, t.name as to_user
       FROM notes n
       JOIN users f ON f.id = n.from_user
       JOIN users t ON t.id = n.to_user
       WHERE from_user = ?`,
      ["1"]
    );
  }

  const notes = await fetchNotes();

  return (
    <fieldset>
      <legend>Server Component</legend>
      <div>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {notes.map(({ id, note, from_user, to_user }) => (
              <tr key={id}>
                <td>{from_user}</td>
                <td>{to_user}</td>
                <td>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </fieldset>
  );
}

export { ServerComponent };
