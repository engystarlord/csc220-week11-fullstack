import StudentCard from "./StudentCard.jsx";

export default function StudentList({ students, loading, error, onDelete, canDelete, deletingId }) {
  if (loading) return <p role="status">Loading students...</p>;
  if (error) return <p className="error" role="alert">Could not load: {error}</p>;
  if (students.length === 0) return <p className="note">No students yet.</p>;
  return (
    <section className="student-grid" aria-label="Student list">
      {students.map((student) => (
        <StudentCard key={student._id} student={student} onDelete={onDelete}
          canDelete={canDelete && !deletingId} deleting={deletingId === student._id} />
      ))}
    </section>
  );
}
