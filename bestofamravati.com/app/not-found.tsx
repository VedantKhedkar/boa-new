import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-[36px]">error</span>
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">404 - Page Not Found</h1>
      <p className="mt-2 text-sm text-slate-600 max-w-md">
        The page or listing you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2.5 rounded-full bg-primary text-white text-xs font-semibold shadow-sm hover:brightness-105 transition-all"
      >
        Return to Home Portal
      </Link>
    </div>
  );
}
