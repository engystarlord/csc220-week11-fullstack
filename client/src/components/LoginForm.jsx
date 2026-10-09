import { useState } from "react";

export default function LoginForm({ onLogin, loginError, busy }) {
  const [email, setEmail] = useState("student1@example.com");
  const [password, setPassword] = useState("password123");

  function handleSubmit(event) {
    event.preventDefault();
    if (!busy) onLogin(email.trim(), password);
  }

  return (
    <section className="panel">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form-row login-row">
        <label>Email
          <input type="email" placeholder="Email" value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username" required disabled={busy} />
        </label>
        <label>Password
          <input type="password" placeholder="Password" value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password" required disabled={busy} />
        </label>
        <button type="submit" disabled={busy}>{busy ? "Logging in..." : "Login"}</button>
      </form>
      {loginError && <p className="error" role="alert">{loginError}</p>}
    </section>
  );
}
