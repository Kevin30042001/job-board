// components/FavoritesList.tsx

"use client";

import { Job } from "@/types/job";
import { useFavorites } from "./FavoritesContext";
import JobCard from "./JobCard";

interface FavoritesListProps {
  jobs: Job[];
}

export default function FavoritesList({ jobs }: FavoritesListProps) {
  const { favorites } = useFavorites();
  const favoriteJobs = jobs.filter((job) => favorites.includes(job.id));

  if (favoriteJobs.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-4">☆</p>
        <p className="text-lg mb-1">No tenés empleos guardados</p>
        <p className="text-sm">
          Hacé click en la estrella de cualquier empleo para guardarlo
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">
        {favoriteJobs.length} empleo{favoriteJobs.length !== 1 ? "s" : ""} guardado{favoriteJobs.length !== 1 ? "s" : ""}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {favoriteJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}