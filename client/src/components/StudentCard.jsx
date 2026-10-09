export default function StudentCard({ student, onDelete, canDelete, deleting }) {
  const passed = student.score >= 60;
  return (
    <article className="card">
      <h3>{student.name}</h3>
      <p>Major: {student.major}</p>
      <p>Score: {student.score} — <span className={passed ? "passed" : "failed"}>{passed ? "Passed" : "Failed"}</span></p>
      <button className="delete-button" onClick={() => onDelete(student._id)} disabled={!canDelete}>
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </article>
  );
}
