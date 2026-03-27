// Centralized category API calls
export async function getCategories() {
  const res = await fetch("http://localhost:5000/api/category/getCategories", {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export default {
  getCategories,
};
