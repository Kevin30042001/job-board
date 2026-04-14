// app/favorites/page.tsx

import { getJobs } from "@/lib/api";
import FavoritesList from "@/components/FavoritesList";
import Link from "next/link";

export default async function FavoritesPage() {
  const jobs = await getJobs(50);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline mb-4 inline-block"
          >
            ← Volver al listado
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Empleos guardados
          </h1>
          <p className="text-gray-500 mt-1">
            Tus empleos favoritos para aplicar después
          </p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-6">
        <FavoritesList jobs={jobs} />
      </section>
    </main>
  );
}