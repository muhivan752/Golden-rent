'use client';

import { useState } from 'react';
import { X, MessageCircle, MapPin, Calendar, Car, User, Phone, Wallet } from 'lucide-react';
import type { FleetItem } from '@/lib/types';
import { siteConfig } from '@/config/site';

const layananOptions = [
  {
    id: 'lepas-kunci',
    label: 'Lepas Kunci (Self-Drive)',
    note: 'Syarat: KTP, SIM A aktif, deposit',
  },
  {
    id: 'dengan-driver',
    label: 'Dengan Driver',
    note: 'Sudah termasuk biaya driver',
  },
  {
    id: 'luar-kota',
    label: 'Luar Kota / Dinas',
    note: 'Termasuk driver, BBM, dan tol',
  },
] as const;

const durasiOptions = [
  { id: 'harian', label: 'Harian' },
  { id: 'mingguan', label: 'Mingguan' },
  { id: 'bulanan', label: 'Bulanan' },
  { id: 'tahunan', label: 'Tahunan' },
] as const;

interface BookingModalProps {
  vehicle: FleetItem | null;
  onClose: () => void;
}

export default function BookingModal({ vehicle, onClose }: BookingModalProps) {
  const [form, setForm] = useState({
    nama: '',
    noHp: '',
    layanan: 'dengan-driver',
    durasi: 'harian',
    tanggalMulai: '',
    tanggalSelesai: '',
    lokasiJemput: '',
    lokasiTujuan: '',
    pembayaran: 'dp-25',
    catatan: '',
  });

  if (!vehicle) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const layananLabel =
    layananOptions.find((l) => l.id === form.layanan)?.label ?? form.layanan;
  const durasiLabel =
    durasiOptions.find((d) => d.id === form.durasi)?.label ?? form.durasi;

  const pembayaranLabel = form.pembayaran === 'dp-25' ? 'DP 25% di awal' : 'Bayar Penuh (100%)';

  const buildWhatsappMessage = () => {
    const lines = [
      `Halo Sewain, saya mau booking:`,
      ``,
      `*Mobil:* ${vehicle.name} (${vehicle.fuel})`,
      `*Layanan:* ${layananLabel}`,
      `*Durasi:* ${durasiLabel}`,
      form.tanggalMulai && `*Mulai:* ${form.tanggalMulai}`,
      form.tanggalSelesai && `*Selesai:* ${form.tanggalSelesai}`,
      form.lokasiJemput && `*Lokasi Penjemputan:* ${form.lokasiJemput}`,
      form.lokasiTujuan && `*Lokasi Tujuan:* ${form.lokasiTujuan}`,
      `*Pembayaran:* ${pembayaranLabel}`,
      ``,
      `*Nama:* ${form.nama}`,
      form.noHp && `*No. HP:* ${form.noHp}`,
      form.catatan && `*Catatan:* ${form.catatan}`,
      ``,
      `Mohon info ketersediaan dan total biayanya. Terima kasih!`,
    ];
    return lines.filter(Boolean).join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(buildWhatsappMessage());
    window.open(`${siteConfig.whatsappUrl}?text=${msg}`, '_blank');
  };

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors';
  const labelClass = 'mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 rounded-t-2xl">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Booking {vehicle.name}</h3>
            <p className="text-sm text-slate-500">
              {vehicle.category} &middot; {vehicle.fuel} &middot; {vehicle.year}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Nama & No HP */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                <User className="h-3.5 w-3.5 text-gold" />
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="nama"
                required
                placeholder="Nama Anda"
                value={form.nama}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                <Phone className="h-3.5 w-3.5 text-gold" />
                No. HP
              </label>
              <input
                type="tel"
                name="noHp"
                placeholder="08xxxxxxxxxx"
                value={form.noHp}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Tipe Layanan */}
          <div>
            <label className={labelClass}>
              <Car className="h-3.5 w-3.5 text-gold" />
              Tipe Layanan *
            </label>
            <div className="grid gap-2">
              {layananOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                    form.layanan === opt.id
                      ? 'border-gold bg-gold/5 ring-1 ring-gold/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="layanan"
                    value={opt.id}
                    checked={form.layanan === opt.id}
                    onChange={handleChange}
                    className="mt-0.5 accent-gold"
                  />
                  <div>
                    <span className="text-sm font-medium text-slate-900">{opt.label}</span>
                    <p className="text-xs text-slate-500">{opt.note}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Durasi */}
          <div>
            <label className={labelClass}>
              <Calendar className="h-3.5 w-3.5 text-gold" />
              Durasi Sewa *
            </label>
            <div className="flex flex-wrap gap-2">
              {durasiOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    form.durasi === opt.id
                      ? 'bg-gold text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="durasi"
                    value={opt.id}
                    checked={form.durasi === opt.id}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Tanggal */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Tanggal Mulai *</label>
              <input
                type="date"
                name="tanggalMulai"
                required
                value={form.tanggalMulai}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Tanggal Selesai *</label>
              <input
                type="date"
                name="tanggalSelesai"
                required
                value={form.tanggalSelesai}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Lokasi Penjemputan & Tujuan */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                <MapPin className="h-3.5 w-3.5 text-gold" />
                Lokasi Penjemputan *
              </label>
              <input
                type="text"
                name="lokasiJemput"
                required
                placeholder="Contoh: Bandara Kualanamu"
                value={form.lokasiJemput}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                <MapPin className="h-3.5 w-3.5 text-gold" />
                Lokasi Tujuan *
              </label>
              <input
                type="text"
                name="lokasiTujuan"
                required
                placeholder="Contoh: Hotel Danau Toba"
                value={form.lokasiTujuan}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Pembayaran */}
          <div>
            <label className={labelClass}>
              <Wallet className="h-3.5 w-3.5 text-gold" />
              Metode Pembayaran *
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                  form.pembayaran === 'dp-25'
                    ? 'border-gold bg-gold/5 ring-1 ring-gold/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="pembayaran"
                  value="dp-25"
                  checked={form.pembayaran === 'dp-25'}
                  onChange={handleChange}
                  className="accent-gold"
                />
                <div>
                  <span className="text-sm font-medium text-slate-900">DP 25%</span>
                  <p className="text-xs text-slate-500">Bayar 25% di awal, sisa saat penjemputan</p>
                </div>
              </label>
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                  form.pembayaran === 'full'
                    ? 'border-gold bg-gold/5 ring-1 ring-gold/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="pembayaran"
                  value="full"
                  checked={form.pembayaran === 'full'}
                  onChange={handleChange}
                  className="accent-gold"
                />
                <div>
                  <span className="text-sm font-medium text-slate-900">Bayar Penuh</span>
                  <p className="text-xs text-slate-500">Bayar 100% langsung</p>
                </div>
              </label>
            </div>
          </div>

          {/* Catatan */}
          <div>
            <label className={labelClass}>Catatan Tambahan</label>
            <textarea
              name="catatan"
              rows={2}
              placeholder="Permintaan khusus, jumlah penumpang, dll."
              value={form.catatan}
              onChange={handleChange}
              className={inputClass + ' resize-none'}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-green-500/25 transition-all hover:bg-green-600 hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5" />
            Kirim ke WhatsApp
          </button>

          <p className="text-center text-xs text-slate-400">
            Detail booking akan dikirim otomatis via WhatsApp
          </p>
        </form>
      </div>
    </div>
  );
}
