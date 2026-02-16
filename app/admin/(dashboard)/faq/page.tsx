'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, GripVertical, HelpCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { DbFAQ } from '@/lib/supabase/types';

type FormData = Omit<DbFAQ, 'id' | 'created_at'>;

const emptyForm: FormData = {
  question: '',
  answer: '',
  is_visible: true,
  sort_order: 0,
};

export default function AdminFAQPage() {
  const [items, setItems] = useState<DbFAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  const fetchItems = useCallback(async () => {
    const { data } = await supabase
      .from('faqs')
      .select('*')
      .order('sort_order', { ascending: true });
    setItems((data as DbFAQ[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editId) {
      await supabase.from('faqs').update(form).eq('id', editId);
    } else {
      await supabase.from('faqs').insert(form);
    }

    setSaving(false);
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
    fetchItems();
  };

  const handleEdit = (item: DbFAQ) => {
    setEditId(item.id);
    setForm({
      question: item.question,
      answer: item.answer,
      is_visible: item.is_visible,
      sort_order: item.sort_order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus FAQ ini?')) return;
    await supabase.from('faqs').delete().eq('id', id);
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
        <p className="text-sm text-slate-500">{items.length} pertanyaan</p>
        <button
          onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-sm font-semibold text-slate-900 transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Tambah FAQ
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
                {editId ? 'Edit FAQ' : 'Tambah FAQ'}
              </h3>
              <button type="button" onClick={closeForm} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Question */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Pertanyaan</label>
                <input
                  type="text"
                  value={form.question}
                  onChange={(e) => setForm((prev) => ({ ...prev, question: e.target.value }))}
                  required
                  placeholder="Bagaimana cara booking?"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Jawaban</label>
                <textarea
                  value={form.answer}
                  onChange={(e) => setForm((prev) => ({ ...prev, answer: e.target.value }))}
                  required
                  rows={5}
                  placeholder="Tulis jawaban lengkap di sini..."
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
          <HelpCircle className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm text-slate-500">Belum ada FAQ.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex-shrink-0 pt-0.5 text-slate-300">
                <GripVertical className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-700">
                    {index + 1}
                  </span>
                  <p className="font-semibold text-slate-900">{item.question}</p>
                  {!item.is_visible && (
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-slate-600 line-clamp-2 pl-7">{item.answer}</p>
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
