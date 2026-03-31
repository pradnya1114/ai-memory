/// <reference types="vite/client" />
/// utils/api.ts
const API_BASE = import.meta.env.VITE_SERVER_URL;

export async function registerOrPlay(payload: { name: string }) {
  const res = await fetch(`${API_BASE}/api/runner/play`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to register/play');
  return res.json() as Promise<{ id: string; played: number }>;
}

export async function updateScore(payload: { id: string; score: number }) {
  const res = await fetch(`${API_BASE}/api/runner/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update score');
  return res.json() as Promise<{ id: string; score: number }>;
}

export async function getAllPlayers() {
  const res = await fetch(`${API_BASE}/api/runner/getAll`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch players');

  return res.json() as Promise<
    Array<{
      _id: string;
      name: string;
      score: number;
      played: number;
      createdAt?: string;
    }>
  >;
}