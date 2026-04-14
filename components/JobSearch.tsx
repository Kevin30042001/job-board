// components/JobSearch.tsx

"use client";

import { useState, useMemo } from "react";
import { Job } from "@/types/job";
import JobCard from "./JobCard";

interface JobSearchProps {
  jobs: Job[];
}

export default function JobSearch({ jobs }: JobSearchProps) {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");

  // Extraer tipos de trabajo únicos de los datos reales
  const jobTypes = useMemo(() => {
    const types = new Set(jobs.map((job) => job.job_type));
    return ["all", ...Array.from(types)];
  }, [jobs]);

  // Filtrar empleos según búsqueda y tipo
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Filtro de búsqueda: busca en título, empresa y tags
      const searchLower = search.toLowerCase();
      const matchesSearch =
        search === "" ||
        job.title.toLowerCase().includes(searchLower) ||
        job.company_name.toLowerCase().includes(searchLower) ||
        job.tags.some((tag) => tag.toLowerCase().includes(searchLower));

      // Filtro de tipo de trabajo
      const matchesType = jobType === "all" || job.job_type === jobType;

      return matchesSearch && matchesType;
    });
  }, [jobs, search, jobType]);

  return (
    <div>
      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar por título, empresa o tecnología..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
        >
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type === "all" ? "Todos los tipos" : type}
            </option>
          ))}
        </select>
      </div>

      {/* Contador de resultados */}
      <p className="text-sm text-gray-400 mb-4">
        {filteredJobs.length} empleos encontrados
      </p>

      {/* Lista de empleos */}
      {filteredJobs.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-1">No se encontraron empleos</p>
          <p className="text-sm">Intentá con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  );
}