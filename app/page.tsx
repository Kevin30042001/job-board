// app/page.tsx

import { getJobs } from "@/lib/api";
import JobSearch from "@/components/JobSearch";
import Link from "next/link";

export default async function HomePage() {
  const jobs = await getJobs(50);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Remote Dev Jobs
            </h1>
            <p className="text-gray-500 mt-1">
              Encuentra tu próximo empleo remoto en desarrollo de software
            </p>
          </div>
          <Link
            href="/favorites"
            className="text-sm px-4 py-2 border border-gray-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors bg-white"
          >
            ★ Favoritos
          </Link>
        </div>
      </header>

      {/* Búsqueda y listado */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <JobSearch jobs={jobs} />
      </section>
    </main>
  );
}