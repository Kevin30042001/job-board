// app/page.tsx

import { getJobs } from "@/lib/api";
import JobCard from "@/components/JobCard";

export default async function HomePage() {
  const jobs = await getJobs(50);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Remote Dev Jobs
          </h1>
          <p className="text-gray-500 mt-1">
            Encuentra tu próximo empleo remoto en desarrollo de software
          </p>
        </div>
      </header>

      {/* Job listing */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <p className="text-sm text-gray-400 mb-4">
          {jobs.length} empleos encontrados
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  );
}