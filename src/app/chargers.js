// Fetch chargers from the API endpoint
export async function fetchChargers() {
  const res = await fetch('/api/chargers');
  if (!res.ok) throw new Error('Failed to fetch chargers');
  return await res.json();
}
