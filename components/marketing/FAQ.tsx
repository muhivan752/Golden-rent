'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Container from '@/components/shared/Container';

export interface FAQData {
  question: string;
  answer: string;
}

const defaultFaqs: FAQData[] = [
  {
    question: 'Apa saja yang termasuk dalam harga rental?',
    answer:
      'Harga sudah termasuk kendaraan, driver (jika paket with driver), dan asuransi dasar. BBM, tol, dan parkir biasanya ditanggung penyewa, kecuali paket all-inclusive yang sudah mencakup semuanya.',
  },
  {
    question: 'Berapa minimal waktu rental?',
    answer:
      'Minimal rental adalah 12 jam (full day). Untuk paket weekly (mingguan) dan monthly (bulanan), kami menyediakan harga spesial yang lebih hemat.',
  },
  {
    question: 'Apakah bisa antar-jemput ke bandara?',
    answer:
      'Tentu! Kami melayani airport transfer di semua kota operasional kami. Hubungi kami untuk jadwal penjemputan yang fleksibel sesuai jam penerbangan Anda.',
  },
  {
    question: 'Bagaimana cara melakukan booking?',
    answer:
      'Sangat mudah! Hubungi kami via WhatsApp di +62 813-7044-6181, pilih armada dan tanggal yang Anda inginkan, lalu kami akan mengirimkan detail dan konfirmasi pembayaran.',
  },
  {
    question: 'Apa yang terjadi jika mobil rusak saat rental?',
    answer:
      'Semua armada kami sudah diasuransikan penuh. Untuk kerusakan akibat pemakaian normal (bukan kelalaian), akan ditangani langsung oleh asuransi tanpa biaya tambahan.',
  },
  {
    question: 'Apakah ada denda jika terlambat mengembalikan kendaraan?',
    answer:
      'Ada overtime charge sebesar Rp 50.000/jam untuk keterlambatan. Jika keterlambatan lebih dari 6 jam, akan dikenakan biaya sewa 1 hari penuh sesuai rate yang berlaku.',
  },
  {
    question: 'Apakah tersedia paket rental untuk event atau wedding?',
    answer:
      'Ya! Kami menyediakan paket khusus untuk event, wedding car, dan gathering corporate. Silakan hubungi kami untuk custom package sesuai kebutuhan acara Anda.',
  },
  {
    question: 'Bagaimana sistem pembayaran yang tersedia?',
    answer:
      'Kami menerima pembayaran via transfer bank (BCA, Mandiri, BNI, BRI). Untuk corporate client, tersedia opsi invoice dengan payment term yang fleksibel.',
  },
];

interface FAQProps {
  data?: FAQData[];
}

export default function FAQ({ data }: FAQProps) {
  const faqs = data && data.length > 0 ? data : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container>
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold-700">
            FAQ
          </span>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Pertanyaan yang{' '}
            <span className="bg-gradient-to-r from-gold-600 via-gold to-yellow-500 bg-clip-text text-transparent">
              Sering Diajukan
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Temukan jawaban untuk pertanyaan umum seputar layanan rental kami
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border-b border-slate-200 transition-colors ${
                  isOpen ? 'border-l-4 border-l-gold bg-slate-50' : 'hover:bg-slate-50'
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 font-semibold text-slate-900">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-gold' : 'text-slate-400'
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
