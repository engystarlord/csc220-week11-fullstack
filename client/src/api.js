const BASE = "http://localhost:3000/api";

async function readError(response) {
  try {
    const data = await response.json();
    return data.error || "Request failed";
  } catch {
    return "Request failed";
  }
}

export async function getStudents() {
  const response = await fetch(`${BASE}/students`);
  if (!response.ok) throw new Error(await readError(response));
  return response.json();
}

export async function loginUser(email, password) {
  const response = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error(await readError(response));
  return response.json();
}

export async function createStudent(student, token) {
  const response = await fetch(`${BASE}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(student)
  });
  if (!response.ok) throw new Error(await readError(response));
  return response.json();
}

export async function deleteStudent(id, token) {
  const response = await fetch(`${BASE}/students/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error(await readError(response));
}
