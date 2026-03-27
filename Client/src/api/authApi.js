// Centralized auth API calls
export async function signIn(payload) {
  const res = await fetch('http://localhost:5000/api/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export async function signUp(payload) {
  const res = await fetch('http://localhost:5000/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export async function signOut() {
  const res = await fetch('http://localhost:5000/api/signout', {
    method: 'POST',
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export default {
  signIn,
  signUp,
  signOut,
};
