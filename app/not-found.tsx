import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
        <span className="text-4xl font-bold text-gold">404</span>
      </div>
      <h1 className="mb-2 text-2xl font-bold text-slate-900">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mb-8 text-slate-600">
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 font-semibold text-navy-900 transition-colors hover:bg-gold-300"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
