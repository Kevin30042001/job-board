// types/job.ts

// Estructura que devuelve la API de Remotive para cada empleo
export interface Job {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo: string;
  category: string;
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
  tags: string[];
}

// Respuesta completa de la API de Remotive
export interface RemotiveResponse {
  "job-count": number;
  jobs: Job[];
}