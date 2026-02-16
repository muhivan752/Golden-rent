'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, Star, MessageSquareQuote } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { DbTestimonial } from '@/lib/supabase/types';

type FormData = Omit<DbTestimonial, 'id' | 'created_at'>;

const emptyForm: FormData = {
  name: '',
  role: '',
  company: '',
  initials: '',
  rating: 5,
  text: '',
  location: '',
  is_visible: true,
  sort_order: 0,
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<DbTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  const fetchItems = useCallback(async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true });
    setItems((data as DbTestimonial[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Auto-generate initials from name
  const updateName = (name: string) => {
    const initials = name
      .split(' ')
      .map((w) => w.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
    setForm((prev) => ({ ...prev, name, initials }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editId) {
      await supabase.from('testimonials').update(form).eq('id', editId);
    } else {
      await supabase.from('testimonials').insert(form);
    }

    setSaving(false);
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
    fetchItems();
  };

  const handleEdit = (item: DbTestimonial) => {
    setEditId(item.id);
    setForm({
      name: item.name,
      role: item.role,
      company: item.company,
      initials: item.initials,
      rating: item.rating,
      text: item.text,
      location: item.location,
      is_visible: item.is_visible,
      sort_order: item.sort_order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus testimonial ini?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    fetchItems();
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
        <p className="text-sm text-slate-500">{items.length} testimonial</p>
        <button
          onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-sm font-semibold text-slate-900 transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Tambah Testimonial
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
                {editId ? 'Edit Testimonial' : 'Tambah Testimonial'}
              </h3>
              <button type="button" onClick={closeForm} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Nama</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateName(e.target.value)}
                  required
                  placeholder="Budi Santoso"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                />
              </div>

              {/* Role + Company */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Jabatan</label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                    required
                    placeholder="HR Manager"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Perusahaan</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                    placeholder="PT. ..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              {/* Location + Rating */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Kota</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Jakarta"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Rating</label>
                  <div className="flex items-center gap-1 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, rating: star }))}
                        className="outline-none"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            star <= form.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Testimoni</label>
                <textarea
                  value={form.text}
                  onChange={(e) => setForm((prev) => ({ ...prev, text: e.target.value }))}
                  required
                  rows={4}
                  placeholder="Tulis testimoni pelanggan di sini..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                />
              </div>

              {/* Sort + Visible */}
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
                      checked={form.is_visible}
                      onChange={(e) => setForm((prev) => ({ ...prev, is_visible: e.target.checked }))}
                      className="h-4 w-4 rounded border-slate-300 text-yellow-500 focus:ring-yellow-500"
                    />
                    <span className="text-sm text-slate-700">Tampilkan</span>
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

      {/* List */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Memuat data...</div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <MessageSquareQuote className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm text-slate-500">Belum ada testimonial.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-sm font-bold text-slate-900">
                {item.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  {!item.is_visible && (
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {item.role} — {item.company} &middot; {item.location}
                </p>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">&ldquo;{item.text}&rdquo;</p>
              </div>
              <div className="flex flex-shrink-0 gap-1">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
