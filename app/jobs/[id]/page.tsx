// app/jobs/[id]/page.tsx

import { getJobs } from "@/lib/api";
import Link from "next/link";

interface JobDetailProps {
    params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobDetailProps) {
    const { id } = await params;
    const jobs = await getJobs(50);
    const job = jobs.find((j) => j.id === Number(id));

    if (!job) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Empleo no encontrado
                    </h1>
                    <Link href="/" className="text-blue-600 hover:underline">
                        ← Volver al listado
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header con botón de regreso */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-4 py-6">
                    <Link
                        href="/"
                        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
                    >
                        ← Volver al listado
                    </Link>

                    <div className="flex items-start gap-4 mt-2">
                        {job.company_logo ? (
                            <img
                                src={job.company_logo}
                                alt={job.company_name}
                                className="w-16 h-16 rounded-lg object-contain bg-gray-50 p-1 border border-gray-100"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                {job.company_name.charAt(0)}
                            </div>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                            <p className="text-gray-500 mt-1">{job.company_name}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
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
                        </div>
                    </div>
                </div>
            </header>

            {/* Descripción del empleo */}
            <section className="max-w-3xl mx-auto px-4 py-8">
                <div
                    className="prose prose-gray max-w-none
            [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-2
            [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2
            [&_li]:my-1 [&_li]:text-gray-700
            [&_p]:text-gray-700 [&_p]:my-2
            [&_a]:text-blue-600 [&_a]:hover:underline
            [&_strong]:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                />

                {/* Botón para aplicar */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Aplicar a este empleo
                    </a>
                </div>
            </section>
        </main>
    );
}