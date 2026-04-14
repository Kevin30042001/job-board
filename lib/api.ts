// lib/api.ts

import { RemotiveResponse, Job } from "@/types/job";

const BASE_URL = "https://remotive.com/api/remote-jobs";

// Obtener empleos remotos de la categoría software-dev
export async function getJobs(limit: number = 20): Promise<Job[]> {
  // next: { revalidate: 3600 } le dice a Next.js que cachee los datos por 1 hora
  // Es como un TTL en Firebase — no hace fetch cada vez que alguien entra
  const res = await fetch(
    `${BASE_URL}?category=software-dev&limit=${limit}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Error al obtener empleos");
  }

  const data: RemotiveResponse = await res.json();
  return data.jobs;
}