'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, Upload, ImageIcon, Car } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import type { DbFleetItem } from '@/lib/supabase/types';

type FormData = Omit<DbFleetItem, 'id' | 'created_at'>;

const emptyForm: FormData = {
  name: '',
  category: 'MPV',
  fuel: 'Bensin',
  price: '',
  year: new Date().getFullYear().toString(),
  seats: 7,
  transmission: 'Automatic',
  image_url: null,
  is_available: true,
  sort_order: 0,
};

const fuelOptions = ['Bensin', 'Diesel', 'Hybrid', 'Elektrik'] as const;
const categoryOptions = ['City Car', 'MPV', 'SUV', 'Sedan', 'Luxury MPV', 'Minibus', 'Bus'] as const;

export default function AdminFleetPage() {
  const [items, setItems] = useState<DbFleetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const supabase = createClient();

  const fetchItems = useCallback(async () => {
    const { data } = await supabase
      .from('fleet')
      .select('*')
      .order('sort_order', { ascending: true });
    setItems((data as DbFleetItem[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from('fleet-images')
      .upload(fileName, file, { upsert: true });

    if (error) {
      setUploadError(`Upload gagal: ${error.message}. Pastikan storage bucket sudah dibuat via /api/setup-admin`);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('fleet-images').getPublicUrl(fileName);
    setForm((prev) => ({ ...prev, image_url: data.publicUrl }));
    setUploading(false);
  };

  const revalidateSite = async () => {
    try { await fetch('/api/revalidate', { method: 'POST' }); } catch { /* ignore */ }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editId) {
      await supabase.from('fleet').update(form).eq('id', editId);
    } else {
      await supabase.from('fleet').insert(form);
    }

    setSaving(false);
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
    fetchItems();
    revalidateSite();
  };

  const handleEdit = (item: DbFleetItem) => {
    setEditId(item.id);
    setForm({
      name: item.name,
      category: item.category,
      fuel: item.fuel,
      price: item.price,
      year: item.year,
      seats: item.seats,
      transmission: item.transmission,
      image_url: item.image_url,
      is_available: item.is_available,
      sort_order: item.sort_order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus armada ini?')) return;
    await supabase.from('fleet').delete().eq('id', id);
    fetchItems();
    revalidateSite();
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">{items.length} unit armada terdaftar</p>
        <button
          onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-sm font-semibold text-slate-900 transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Tambah Armada
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editId ? 'Edit Armada' : 'Tambah Armada'}
              </h3>
              <button type="button" onClick={closeForm} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Foto</label>
                {form.image_url ? (
                  <div className="relative mb-2 h-40 w-full overflow-hidden rounded-lg bg-slate-100">
                    <Image src={form.image_url} alt="preview" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, image_url: null }))}
                      className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-slate-300 p-6 transition-colors hover:border-yellow-400">
                    {uploading ? (
                      <p className="text-sm text-slate-500">Uploading...</p>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-slate-400" />
                        <p className="text-sm text-slate-500">Klik untuk upload foto</p>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  </label>
                )}
                {uploadError && (
                  <p className="mt-2 text-xs text-red-500">{uploadError}</p>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Nama Kendaraan</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="Toyota Avanza"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                />
              </div>

              {/* Category + Fuel */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Kategori</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500"
                  >
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Bahan Bakar</label>
                  <select
                    value={form.fuel}
                    onChange={(e) => setForm((prev) => ({ ...prev, fuel: e.target.value as FormData['fuel'] }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500"
                  >
                    {fuelOptions.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Harga</label>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                  required
                  placeholder="Mulai Rp 400rb/hari"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                />
              </div>

              {/* Year + Seats + Transmission */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Tahun</label>
                  <input
                    type="text"
                    value={form.year}
                    onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Kursi</label>
                  <input
                    type="number"
                    value={form.seats}
                    onChange={(e) => setForm((prev) => ({ ...prev, seats: Number(e.target.value) }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Transmisi</label>
                  <select
                    value={form.transmission}
                    onChange={(e) => setForm((prev) => ({ ...prev, transmission: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>

              {/* Sort Order + Available */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Urutan</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm((prev) => ({ ...prev, sort_order: Number(e.target.value) }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 py-2">
                    <input
                      type="checkbox"
                      checked={form.is_available}
                      onChange={(e) => setForm((prev) => ({ ...prev, is_available: e.target.checked }))}
                      className="h-4 w-4 rounded border-slate-300 text-yellow-500 focus:ring-yellow-500"
                    />
                    <span className="text-sm text-slate-700">Tersedia</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button type="button" onClick={closeForm} className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Menyimpan...' : editId ? 'Update' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Memuat data...</div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <Car className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm text-slate-500">Belum ada armada. Tambahkan yang pertama!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 font-medium text-slate-500">Foto</th>
                <th className="px-4 py-3 font-medium text-slate-500">Nama</th>
                <th className="px-4 py-3 font-medium text-slate-500">Kategori</th>
                <th className="px-4 py-3 font-medium text-slate-500">BBM</th>
                <th className="px-4 py-3 font-medium text-slate-500">Harga</th>
                <th className="px-4 py-3 font-medium text-slate-500">Status</th>
                <th className="px-4 py-3 font-medium text-slate-500">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    {item.image_url ? (
                      <div className="relative h-10 w-14 overflow-hidden rounded-md bg-slate-100">
                        <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="flex h-10 w-14 items-center justify-center rounded-md bg-slate-100">
                        <ImageIcon className="h-4 w-4 text-slate-300" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                  <td className="px-4 py-3 text-slate-600">{item.category}</td>
                  <td className="px-4 py-3 text-slate-600">{item.fuel}</td>
                  <td className="px-4 py-3 text-slate-600">{item.price}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.is_available
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {item.is_available ? 'Tersedia' : 'Tidak Tersedia'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(item)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-yellow-50 hover:text-yellow-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
