import { AsyncDatabase } from "promised-sqlite3";

// This assumes you are user with ID 1

export default async function MyNotesPage() {
  async function fetchNotes() {
    const db = await AsyncDatabase.open("./notes.db");
    const notesFromUserPromise = db.all(
      `SELECT n.id as id, n.note as note, f.name as from_user, t.name as to_user
       FROM notes n
       JOIN users f ON f.id = n.from_user
       JOIN users t ON t.id = n.to_user
       WHERE from_user = ?`,
      ["1"]
    );
    const notesToUserPromise = db.all(
      `SELECT n.id as id, n.note as note, f.name as from_user, t.name as to_user
       FROM notes n
       JOIN users f ON f.id = n.from_user
       JOIN users t ON t.id = n.to_user
       WHERE to_user = ?`,
      ["1"]
    );

    const [notesFromUser, notesToUser] = await Promise.all([
      notesFromUserPromise,
      notesToUserPromise,
    ]);

    return { notesFromUser, notesToUser };
  }

  const { notesFromUser, notesToUser } = await fetchNotes();

  return (
    <div>
      <h1>My Notes</h1>

      <fieldset>
        <legend>Notes To You</legend>
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
              {notesToUser.map(({ id, note, from_user, to_user }) => (
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

      <fieldset>
        <legend>Notes From You</legend>
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
              {notesFromUser.map(({ id, note, from_user, to_user }) => (
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
    </div>
  );
}
