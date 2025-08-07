import path from "path:node";
import { AsyncDatabase } from "promised-sqlite3";

// Assumes the user's logged in as ID 1

async function ServerComponent() {
  console.log("Rendering server component");

  async function fetchNotes() {
    console.log("Running server function fetchNotes");

    const dbPath = path.resolve(import.meta.dirname, "../notes.db");
    const db = await AsyncDatabase.open(dbPath);
    const from = await db.all(
      `SELECT n.id as id, n.note as note, f.name as from_user, t.name as to_user
       FROM notes n
       JOIN users f on f.id = n.from_user
       JOIN users t on t.id = n.to_user
       WHERE from_user = ?`,
      ["1"]
    );

    return { from };
  }

  const notes = await fetchNotes();

  return (
    <fieldset>
      <legend>Server Component</legend>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {notes.from.map(({ id, note, from_user, to_user }) => (
            <tr key={id}>
              <td>{from_user}</td>
              <td>{to_user}</td>
              <td>{note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </fieldset>
  );
}

export { ServerComponent };
