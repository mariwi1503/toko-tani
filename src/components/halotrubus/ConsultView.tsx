import React, { useState, useMemo } from 'react';
import { 
  Search, X, MessageSquare, Users, Clock, 
  CreditCard, ChevronRight, Video, Calendar, CheckCircle, AlertCircle,
  ArrowLeft, Send, ShieldCheck, Lock
} from 'lucide-react';
import { experts, Expert, formatPrice } from '@/data/dummyData';
import ExpertCard from './ExpertCard';

interface ConsultViewProps { onExpertClick: (expert: Expert) => void; }

interface ConsultationHistory {
  id: string;
  expertName: string;
  expertImage: string;
  date: string;
  type: 'chat' | 'call';
  status: 'pending' | 'paid' | 'active' | 'completed';
  price: number;
}

// DATA DUMMY (Menambahkan contoh Selesai)
const dummyHistory: ConsultationHistory[] = [
  { id: '1', expertName: 'Dr. Ir. Budi Santoso', expertImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e', date: '03 Feb 2026, 10:00', type: 'call', status: 'active', price: 75000 },
  { id: '2', expertName: 'Siti Aminah, M.P.', expertImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', date: '02 Feb 2026, 14:00', type: 'chat', status: 'paid', price: 50000 },
  { id: '3', expertName: 'Andi Wijaya, S.P.', expertImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', date: '30 Jan 2026, 09:00', type: 'chat', status: 'completed', price: 50000 }, // CONTOH SELESAI
  { id: '4', expertName: 'Rina Kartika', expertImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', date: '05 Feb 2026, 11:00', type: 'call', status: 'pending', price: 75000 },
];

const specializations = ['Semua', 'Tanaman Pangan', 'Hidroponik', 'Hama & Penyakit', 'Tanaman Hias', 'Sayuran & Buah'];

const ConsultView: React.FC<ConsultViewProps> = ({ onExpertClick }) => {
  const [activeTab, setActiveTab] = useState<'history' | 'experts'>('history'); // Default history untuk demo
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('Semua');

  // Modals States
  const [showPayment, setShowPayment] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [activeConsultation, setActiveConsultation] = useState<ConsultationHistory | null>(null);

  // ... (useMemo filteredExperts tetap sama)
  const filteredExperts = useMemo(() => {
    let filtered = [...experts];
    if (searchQuery) filtered = filtered.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedSpec !== 'Semua') filtered = filtered.filter(e => e.specialization === selectedSpec);
    return filtered.sort((a, b) => (a.isOnline === b.isOnline ? 0 : a.isOnline ? -1 : 1));
  }, [searchQuery, selectedSpec]);

  const getSessionStatusUI = (status: string) => {
    switch (status) {
      case 'active': return { label: 'Sesi Sedang Berlangsung', text: 'text-green-600', bg: 'bg-green-50', icon: <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" /> };
      case 'paid': return { label: 'Pembayaran Berhasil', text: 'text-blue-600', bg: 'bg-blue-50', icon: <CheckCircle size={14} /> };
      case 'pending': return { label: 'Menunggu Pembayaran', text: 'text-orange-600', bg: 'bg-orange-50', icon: <AlertCircle size={14} /> };
      default: return { label: 'Konsultasi Selesai', text: 'text-gray-500', bg: 'bg-gray-100', icon: <CheckCircle size={14} /> };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      {/* Header & Sticky Tabs */}
      <div className="bg-white px-6 pt-8 pb-4 rounded-b-[2.5rem] shadow-sm sticky top-0 z-30">
        <h1 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Konsultasi Ahli</h1>
        <div className="flex bg-gray-100 p-1.5 rounded-[1.5rem]">
          <button onClick={() => setActiveTab('experts')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1.2rem] text-sm font-bold transition-all ${activeTab === 'experts' ? 'bg-white text-green-600 shadow-md' : 'text-gray-500'}`}>
            <Users size={18} /> Cari Ahli
          </button>
          <button onClick={() => setActiveTab('history')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1.2rem] text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-white text-green-600 shadow-md' : 'text-gray-500'}`}>
            <MessageSquare size={18} /> Sesi Saya
          </button>
        </div>
      </div>

      {activeTab === 'experts' ? (
        <div className="p-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3 bg-white border border-gray-100 shadow-sm rounded-2xl px-5 py-4 mb-4"><Search size={20} className="text-gray-400" /><input type="text" placeholder="Cari ahli..." className="bg-transparent flex-1 outline-none text-sm" /></div>
          <div className="space-y-4">{filteredExperts.map(expert => <ExpertCard key={expert.id} expert={expert} onConsultClick={onExpertClick} />)}</div>
        </div>
      ) : (
        <div className="p-6 space-y-6">
          {dummyHistory.map((item) => {
            const ui = getSessionStatusUI(item.status);
            return (
              <div key={item.id} className="bg-white rounded-[2.2rem] overflow-hidden shadow-sm border border-gray-100 transition-all active:scale-[0.99]">
                <div className={`flex items-center gap-2 px-6 py-3 ${ui.bg} ${ui.text} text-[10px] font-black uppercase tracking-widest`}>
                  {ui.icon} {ui.label}
                </div>
                <div className="p-6">
                  <div className="flex gap-4 mb-6">
                    <img src={item.expertImage} className="w-16 h-16 rounded-[1.2rem] object-cover" alt="" />
                    <div className="flex-1">
                      <h4 className="font-extrabold text-gray-900 text-base">{item.expertName}</h4>
                      <div className="flex gap-2 mt-2">
                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${item.type === 'chat' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}><MessageSquare size={12} /> {item.type}</span>
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-black uppercase"><Calendar size={12} /> {item.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-100">
                    <div><p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Total Biaya</p><p className="text-lg font-black text-gray-900">{formatPrice(item.price)}</p></div>
                    {item.status === 'pending' ? (
                      <button onClick={() => { setActiveConsultation(item); setShowPayment(true); }} className="bg-orange-500 text-white px-6 py-3.5 rounded-2xl text-xs font-black uppercase flex items-center gap-2 shadow-lg shadow-orange-100">
                        <CreditCard size={16} /> Bayar Sesi
                      </button>
                    ) : (
                      <button 
                        onClick={() => { setActiveConsultation(item); setShowChatRoom(true); }}
                        className={`px-6 py-3.5 rounded-2xl text-xs font-black uppercase flex items-center gap-2 transition-all shadow-lg ${item.status === 'completed' ? 'bg-gray-100 text-gray-600 shadow-none' : 'bg-green-500 text-white shadow-green-100'}`}
                      >
                        {item.status === 'completed' ? 'Lihat Riwayat' : item.status === 'paid' ? 'Mulai Sesi' :  'Masuk Sesi'} <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- MODAL CHAT ROOM (Berfungsi untuk Aktif & Selesai) --- */}
      {showChatRoom && activeConsultation && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-white sticky top-0 shadow-sm">
            <button onClick={() => setShowChatRoom(false)} className="p-2 bg-gray-50 rounded-full"><ArrowLeft size={24} /></button>
            <div className="flex items-center gap-3 flex-1">
              <img src={activeConsultation.expertImage} className="w-10 h-10 rounded-full object-cover shadow-sm" alt="" />
              <div>
                <h4 className="font-black text-gray-900 text-sm leading-tight">{activeConsultation.expertName}</h4>
                <p className={`text-[9px] font-black uppercase tracking-wider ${activeConsultation.status === 'completed' ? 'text-gray-400' : 'text-green-500'}`}>
                   Sesi {activeConsultation.status === 'completed' ? 'Telah Berakhir' : 'Aktif'}
                </p>
              </div>
            </div>
            {activeConsultation.status !== 'completed' && <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse ring-4 ring-green-100" />}
          </div>

          {/* Body */}
          <div className="flex-1 bg-gray-50 p-6 space-y-6 overflow-y-auto">
             <div className="flex justify-center mb-4">
                <span className="bg-gray-200/50 text-gray-500 text-[9px] font-black py-1.5 px-4 rounded-full uppercase flex items-center gap-2 tracking-widest">
                   {activeConsultation.status === 'completed' ? <Lock size={10} /> : <ShieldCheck size={10} />}
                   {activeConsultation.status === 'completed' ? 'Riwayat Percakapan Terkunci' : 'Koneksi Terenkripsi'}
                </span>
             </div>

             {/* Pesan Ahli */}
             <div className="flex flex-col gap-1 max-w-[85%]">
               <div className="bg-white p-5 rounded-3xl rounded-tl-none shadow-sm border border-gray-100">
                 <p className="text-sm text-gray-800 font-medium leading-relaxed">
                   Halo! Terkait masalah daun jagung yang menguning, itu kemungkinan besar kekurangan Nitrogen atau gejala awal penyakit Hawar Daun. Apakah sudah dilakukan pemupukan minggu ini?
                 </p>
               </div>
               <span className="text-[10px] text-gray-400 font-bold ml-1">10:05 AM</span>
             </div>

             {/* Pesan User (Simulasi) */}
             <div className="flex flex-col gap-1 max-w-[85%] self-end items-end">
               <div className="bg-green-500 text-white p-5 rounded-3xl rounded-tr-none shadow-md">
                 <p className="text-sm font-medium leading-relaxed">
                   Belum dok, rencana sore ini. Sebaiknya pakai pupuk apa ya?
                 </p>
               </div>
               <span className="text-[10px] text-gray-400 font-bold mr-1">10:08 AM</span>
             </div>

             {activeConsultation.status === 'completed' && (
                <div className="p-6 bg-blue-50 border border-blue-100 rounded-[2rem] text-center">
                   <CheckCircle className="mx-auto text-blue-500 mb-2" size={32} />
                   <h5 className="font-black text-blue-900 text-sm">Konsultasi Telah Selesai</h5>
                   <p className="text-blue-600 text-[11px] font-medium mt-1">Sesi ini berakhir pada {activeConsultation.date}. Hubungi kembali ahli jika ada kendala baru.</p>
                </div>
             )}
          </div>

          {/* Input Chat (Conditional) */}
          <div className="p-6 bg-white border-t border-gray-100">
            {activeConsultation.status === 'completed' ? (
               <button onClick={() => setShowChatRoom(false)} className="w-full py-4 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase text-xs tracking-widest">
                  Kembali Ke Riwayat
               </button>
            ) : (
               <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-5 py-3">
                 <input type="text" placeholder="Tulis pesan..." className="bg-transparent flex-1 outline-none text-sm font-medium" />
                 <button className="bg-green-500 p-2.5 rounded-xl text-white shadow-md active:scale-90 transition-all"><Send size={18} /></button>
               </div>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL PEMBAYARAN (tetap sama seperti sebelumnya) --- */}
      {showPayment && activeConsultation && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPayment(false)} />
          <div className="relative bg-white w-full max-w-md rounded-t-[3rem] sm:rounded-[2.5rem] p-8 animate-in slide-in-from-bottom duration-300">
             <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto mb-8 sm:hidden" />
             <div className="text-center mb-8">
                <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-[2rem] flex items-center justify-center mx-auto mb-4"><CreditCard size={32} /></div>
                <h3 className="text-2xl font-black text-gray-900">Pembayaran Sesi</h3>
                <p className="text-sm text-gray-400 font-medium">Selesaikan pembayaran untuk mulai bertanya</p>
             </div>
             <div className="bg-gray-50 rounded-[2rem] p-6 mb-8">
                <div className="flex justify-between items-center"><span className="text-xs font-bold text-gray-400 uppercase">Ahli</span><span className="text-sm font-black text-gray-800">{activeConsultation.expertName}</span></div>
                <div className="h-px bg-gray-200 my-4 border-dashed" />
                <div className="flex justify-between items-center"><span className="text-xs font-bold text-gray-400 uppercase">Total Bayar</span><span className="text-xl font-black text-green-600">{formatPrice(activeConsultation.price)}</span></div>
             </div>
             <button onClick={() => setShowPayment(false)} className="w-full py-5 bg-green-500 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-green-100 active:scale-95 transition-all">Bayar Sekarang</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultView;