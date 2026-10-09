import { useEffect, useState } from "react";
import { getStudents, loginUser, createStudent, deleteStudent } from "./api.js";
import LoginForm from "./components/LoginForm.jsx";
import AddStudentForm from "./components/AddStudentForm.jsx";
import StudentList from "./components/StudentList.jsx";

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Lab requirement: the JWT lives only in React state. Refresh logs out.
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState("");
  const [actionError, setActionError] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    let active = true;
    async function loadStudents() {
      try {
        setLoading(true);
        setError("");
        const data = await getStudents();
        if (active) setStudents(data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadStudents();
    return () => { active = false; };
  }, []);

  async function handleLogin(email, password) {
    setLoginBusy(true);
    setLoginError("");
    try {
      const data = await loginUser(email, password);
      setToken(data.token);
      setActionError("");
    } catch (err) {
      setToken("");
      setLoginError(err.message);
    } finally {
      setLoginBusy(false);
    }
  }

  async function handleAdd(student) {
    setActionError("");
    try {
      const created = await createStudent(student, token);
      // A new array triggers a React render immediately after POST succeeds.
      setStudents((currentStudents) => [created, ...currentStudents]);
      return true;
    } catch (err) {
      setActionError(err.message);
      return false;
    }
  }

  async function handleDelete(id) {
    if (!token || deletingId) return;
    setDeletingId(id);
    setActionError("");
    try {
      await deleteStudent(id, token);
      setStudents((currentStudents) => currentStudents.filter((student) => student._id !== id));
    } catch (err) {
      setActionError(err.message);
    } finally {
      setDeletingId("");
    }
  }

  function handleLogout() {
    setToken("");
    setLoginError("");
    setActionError("");
  }

  return (
    <div className="page">
      <header>
        <h1>CSC220 Student Manager</h1>
        <p>React + Express + MongoDB</p>
      </header>
      <LoginForm onLogin={handleLogin} loginError={loginError} busy={loginBusy} />
      {token ? (
        <div className="session-row">
          <p className="success" role="status">Logged in. Protected actions are enabled.</p>
          <button className="secondary-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p className="note">GET is public. Login is required for Add and Delete.</p>
      )}
      <AddStudentForm onAdd={handleAdd} disabled={!token} />
      {actionError && <p className="error" role="alert">{actionError}</p>}
      <h2>Students ({students.length})</h2>
      <StudentList students={students} loading={loading} error={error}
        onDelete={handleDelete} canDelete={Boolean(token)} deletingId={deletingId} />
    </div>
  );
}
