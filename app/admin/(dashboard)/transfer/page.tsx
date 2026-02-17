'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Plane,
  Train,
  Ship,
  Bus,
  MapPin,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { DbTransferRoute, DbTransferVehicle, TransferType } from '@/lib/supabase/types';
import { defaultTransferVehicles, defaultTransferIncludes } from '@/lib/constants';

type FormData = Omit<DbTransferRoute, 'id' | 'created_at'>;

const emptyForm: FormData = {
  type: 'Bandara',
  origin: '',
  origin_code: '',
  destination: '',
  estimation: '',
  vehicles: defaultTransferVehicles.map((v) => ({ ...v, price: '' })),
  includes: [...defaultTransferIncludes],
  is_active: true,
  sort_order: 0,
};

const typeOptions: TransferType[] = ['Bandara', 'Stasiun', 'Pelabuhan', 'Terminal'];

const typeIcons: Record<TransferType, typeof Plane> = {
  Bandara: Plane,
  Stasiun: Train,
  Pelabuhan: Ship,
  Terminal: Bus,
};

const typeBadgeColors: Record<TransferType, string> = {
  Bandara: 'bg-amber-50 text-amber-700',
  Stasiun: 'bg-blue-50 text-blue-700',
  Pelabuhan: 'bg-cyan-50 text-cyan-700',
  Terminal: 'bg-purple-50 text-purple-700',
};

export default function AdminTransferPage() {
  const [items, setItems] = useState<DbTransferRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  const fetchItems = useCallback(async () => {
    const { data } = await supabase
      .from('transfer_routes')
      .select('*')
      .order('sort_order', { ascending: true });
    setItems((data as DbTransferRoute[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      vehicles: form.vehicles.filter((v) => v.vehicle_name.trim() !== ''),
    };

    if (editId) {
      await supabase.from('transfer_routes').update(payload).eq('id', editId);
    } else {
      await supabase.from('transfer_routes').insert(payload);
    }

    // Revalidate landing page
    try {
      await fetch('/api/revalidate');
    } catch {}

    setSaving(false);
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
    fetchItems();
  };

  const handleEdit = (item: DbTransferRoute) => {
    setEditId(item.id);
    setForm({
      type: item.type,
      origin: item.origin,
      origin_code: item.origin_code,
      destination: item.destination,
      estimation: item.estimation,
      vehicles: item.vehicles.length > 0 ? item.vehicles : defaultTransferVehicles.map((v) => ({ ...v, price: '' })),
      includes: item.includes.length > 0 ? item.includes : [...defaultTransferIncludes],
      is_active: item.is_active,
      sort_order: item.sort_order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus rute transfer ini?')) return;
    await supabase.from('transfer_routes').delete().eq('id', id);
    try {
      await fetch('/api/revalidate');
    } catch {}
    fetchItems();
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
  };

  const updateVehicle = (index: number, field: keyof DbTransferVehicle, value: string | number) => {
    setForm((prev) => {
      const vehicles = [...prev.vehicles];
      vehicles[index] = { ...vehicles[index], [field]: value };
      return { ...prev, vehicles };
    });
  };

  const addVehicle = () => {
    setForm((prev) => ({
      ...prev,
      vehicles: [...prev.vehicles, { vehicle_name: '', seats: 6, price: '' }],
    }));
  };

  const removeVehicle = (index: number) => {
    setForm((prev) => ({
      ...prev,
      vehicles: prev.vehicles.filter((_, i) => i !== index),
    }));
  };

  const toggleInclude = (item: string) => {
    setForm((prev) => ({
      ...prev,
      includes: prev.includes.includes(item)
        ? prev.includes.filter((i) => i !== item)
        : [...prev.includes, item],
    }));
  };

  const formatPrice = (price: string) => {
    if (!price) return '—';
    return `Rp ${Number(price).toLocaleString('id-ID')}`;
  };

  const activeCount = items.filter((i) => i.is_active).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {items.length} rute ({activeCount} aktif)
        </p>
        <button
          onClick={() => {
            setForm(emptyForm);
            setEditId(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-sm font-semibold text-slate-900 transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Tambah Rute
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editId ? 'Edit Rute Transfer' : 'Tambah Rute Transfer'}
              </h3>
              <button
                type="button"
                onClick={closeForm}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Type & Estimation */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Tipe Transfer
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        type: e.target.value as TransferType,
                      }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                  >
                    {typeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Estimasi Waktu
                  </label>
                  <input
                    type="text"
                    value={form.estimation}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        estimation: e.target.value,
                      }))
                    }
                    required
                    placeholder="~45 min"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                  />
                </div>
              </div>

              {/* Origin */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Lokasi Asal
                  </label>
                  <input
                    type="text"
                    value={form.origin}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, origin: e.target.value }))
                    }
                    required
                    placeholder="Bandara Kualanamu"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Kode
                  </label>
                  <input
                    type="text"
                    value={form.origin_code}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        origin_code: e.target.value,
                      }))
                    }
                    placeholder="KNO"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                  />
                </div>
              </div>

              {/* Destination */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Lokasi Tujuan
                </label>
                <input
                  type="text"
                  value={form.destination}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      destination: e.target.value,
                    }))
                  }
                  required
                  placeholder="Kota Medan"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                />
              </div>

              {/* Vehicles */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">
                    Harga per Kendaraan
                  </label>
                  <button
                    type="button"
                    onClick={addVehicle}
                    className="text-xs font-medium text-yellow-600 hover:text-yellow-700"
                  >
                    + Tambah kendaraan
                  </button>
                </div>
                <div className="space-y-2 rounded-lg bg-slate-50 p-3">
                  {form.vehicles.map((v, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 rounded-lg border border-slate-100 bg-white p-3 sm:flex-row sm:items-center"
                    >
                      <input
                        type="text"
                        value={v.vehicle_name}
                        onChange={(e) =>
                          updateVehicle(i, 'vehicle_name', e.target.value)
                        }
                        placeholder="Nama kendaraan"
                        className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none focus:border-yellow-500"
                      />
                      <input
                        type="number"
                        value={v.seats}
                        onChange={(e) =>
                          updateVehicle(i, 'seats', Number(e.target.value))
                        }
                        placeholder="Seat"
                        className="w-20 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none focus:border-yellow-500"
                      />
                      <div className="relative w-full sm:w-40">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                          Rp
                        </span>
                        <input
                          type="text"
                          value={v.price}
                          onChange={(e) =>
                            updateVehicle(i, 'price', e.target.value)
                          }
                          placeholder="0"
                          className="w-full rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 text-right text-sm text-slate-900 outline-none focus:border-yellow-500"
                        />
                      </div>
                      {form.vehicles.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVehicle(i)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Sudah Termasuk
                </label>
                <div className="flex flex-wrap gap-3">
                  {defaultTransferIncludes.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <input
                        type="checkbox"
                        checked={form.includes.includes(item)}
                        onChange={() => toggleInclude(item)}
                        className="h-4 w-4 rounded border-slate-300 text-yellow-500 focus:ring-yellow-500"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort + Active */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Urutan
                  </label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        sort_order: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-yellow-500"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 py-2">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          is_active: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-slate-300 text-yellow-500 focus:ring-yellow-500"
                    />
                    <span className="text-sm text-slate-700">Aktif</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
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
          <MapPin className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm text-slate-500">Belum ada rute transfer.</p>
          <p className="mt-1 text-xs text-slate-400">
            Klik &quot;Tambah Rute&quot; untuk menambahkan rute pertama.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => {
            const TypeIcon = typeIcons[item.type];
            return (
              <div
                key={item.id}
                className={`flex items-start gap-4 rounded-xl border bg-white p-4 ${
                  item.is_active
                    ? 'border-slate-200'
                    : 'border-slate-100 opacity-60'
                }`}
              >
                {/* Icon */}
                <div className="flex-shrink-0 rounded-lg bg-slate-100 p-2.5">
                  <TypeIcon className="h-5 w-5 text-slate-600" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-900">
                      {item.origin} → {item.destination}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeBadgeColors[item.type]}`}
                    >
                      {item.type}
                    </span>
                    {!item.is_active && (
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">
                        Nonaktif
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span>{item.estimation}</span>
                    <span>·</span>
                    <span>{item.vehicles.length} kendaraan</span>
                    <span>·</span>
                    <span>
                      {item.vehicles.some((v) => v.price)
                        ? item.vehicles
                            .filter((v) => v.price)
                            .map(
                              (v) =>
                                `${v.vehicle_name}: ${formatPrice(v.price)}`
                            )
                            .join(', ')
                        : 'Harga belum diisi'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
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
            );
          })}
        </div>
      )}
    </div>
  );
}
