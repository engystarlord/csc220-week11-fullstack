import { useState } from "react";

export default function AddStudentForm({ onAdd, disabled }) {
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [score, setScore] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (disabled || busy || !name.trim() || !major.trim() || score === "") return;
    const numericScore = Number(score);
    if (!Number.isFinite(numericScore) || numericScore < 0 || numericScore > 100) return;
    setBusy(true);
    try {
      const saved = await onAdd({ name: name.trim(), major: major.trim(), score: numericScore });
      if (saved) {
        setName("");
        setMajor("");
        setScore("");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} className="form-row">
        <label>Name
          <input type="text" placeholder="Name" value={name}
            onChange={(event) => setName(event.target.value)} required disabled={disabled || busy} />
        </label>
        <label>Major
          <input type="text" placeholder="Major" value={major}
            onChange={(event) => setMajor(event.target.value)} required disabled={disabled || busy} />
        </label>
        <label>Score
          <input type="number" min="0" max="100" step="any" placeholder="Score" value={score}
            onChange={(event) => setScore(event.target.value)} required disabled={disabled || busy} />
        </label>
        <button type="submit" disabled={disabled || busy}>{busy ? "Adding..." : "Add"}</button>
      </form>
      {disabled && <p className="note">Login first to add students.</p>}
    </section>
  );
}
