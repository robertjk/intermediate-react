"use server";

import { AsyncDatabase } from "promised-sqlite3";

export default async function postNote(formData) {
  console.log("postNote called with:", formData);

  const fromUser = formData.get("from-user");
  const toUser = formData.get("to-user");
  const note = formData.get("note");

  if (!fromUser || !toUser || !note) {
    throw new TypeError("Empty note form value");
  }

  const db = await AsyncDatabase.open("./notes.db");
  await db.run(
    "INSERT INTO notes (from_user, to_user, note) VALUES (?, ?, ?)",
    [fromUser, toUser, note]
  );
}
