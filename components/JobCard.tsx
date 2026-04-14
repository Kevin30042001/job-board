// components/JobCard.tsx

"use client";

import { Job } from "@/types/job";
import Link from "next/link";
import { useFavorites } from "./FavoritesContext";

function timeAgo(dateString: string): string {
  const now = new Date();
  const published = new Date(dateString);
  const diffMs = now.getTime() - published.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Hace 1 día";
  if (diffDays < 30) return `Hace ${diffDays} días`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return "Hace 1 mes";
  return `Hace ${diffMonths} meses`;
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const saved = isFavorite(job.id);

  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-md transition-all bg-white relative">
      {/* Botón de favorito */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(job.id);
        }}
        className="absolute top-3 right-3 text-xl cursor-pointer hover:scale-110 transition-transform"
        title={saved ? "Quitar de favoritos" : "Guardar en favoritos"}
      >
        {saved ? "★" : "☆"}
      </button>

      <Link href={`/jobs/${job.id}`}>
        {/* Header: logo + empresa */}
        <div className="flex items-start gap-4 mb-3 pr-8">
          {job.company_logo ? (
            <img
              src={job.company_logo}
              alt={job.company_name}
              className="w-12 h-12 rounded-lg object-contain bg-gray-50 p-1"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
              {job.company_name.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base truncate">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500">{job.company_name}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
            {job.job_type}
          </span>
          {job.candidate_required_location && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-700">
              {job.candidate_required_location}
            </span>
          )}
          {job.salary && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700">
              {job.salary}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{job.category}</span>
          <span>{timeAgo(job.publication_date)}</span>
        </div>
      </Link>
    </div>
  );
}