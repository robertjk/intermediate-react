import TeacherClientPage from "./teacherClientPage";
import fetchNotes from "./fetchNotes";

export default async function TeacherPage() {
  const initialNotes = await fetchNotes();

  return (
    <TeacherClientPage initialNotes={initialNotes} fetchNotes={fetchNotes} />
  );
}
