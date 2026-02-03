import React, { useState, useMemo } from 'react';
import { 
  Search, MessageSquare, Users, CreditCard, ChevronRight, 
  Calendar, CheckCircle, AlertCircle, ArrowLeft, Send, 
  ShieldCheck, Lock
} from 'lucide-react';
import { experts, Expert, formatPrice } from '@/data/dummyData';
import ExpertCard from './ExpertCard';

interface ConsultViewProps { onExpertClick: (expert: Expert) => void; }

interface ConsultationHistory {
  id: string;
  expertName: string;
  expertImage: string;
  date: string;
  status: 'pending' | 'paid' | 'active' | 'completed';
  price: number;
}

const dummyHistory: ConsultationHistory[] = [
  { id: '1', expertName: 'Dr. Ir. Budi Santoso', expertImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e', date: '03 Feb 2026, 10:00', status: 'active', price: 50000 },
  { id: '2', expertName: 'Siti Aminah, M.P.', expertImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', date: '02 Feb 2026, 14:00', status: 'paid', price: 50000 },
  { id: '3', expertName: 'Rina Kartika, S.P.', expertImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', date: '05 Feb 2026, 11:00', status: 'pending', price: 75000 },
  { id: '4', expertName: 'Andi Wijaya, S.P.', expertImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', date: '30 Jan 2026, 09:00', status: 'completed', price: 50000 },
];

const ConsultView: React.FC<ConsultViewProps> = ({ onExpertClick }) => {
  const [activeTab, setActiveTab] = useState<'history' | 'experts'>('history');
  const [searchQuery, setSearchQuery] = useState('');
  
  // States untuk kontrol Modal
  const [showPayment, setShowPayment] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [activeConsultation, setActiveConsultation] = useState<ConsultationHistory | null>(null);

  const filteredExperts = useMemo(() => {
    let filtered = [...experts];
    if (searchQuery) filtered = filtered.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return filtered.sort((a, b) => (a.isOnline === b.isOnline ? 0 : a.isOnline ? -1 : 1));
  }, [searchQuery]);

  const getSessionConfig = (status: string) => {
    switch (status) {
      case 'active': 
        return { label: 'Chat Sedang Berlangsung', btnLabel: 'Masuk Chat', text: 'text-green-600', bg: 'bg-green-50', icon: <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" /> };
      case 'paid': 
        return { label: 'Pembayaran Berhasil', btnLabel: 'Mulai Chat', text: 'text-blue-600', bg: 'bg-blue-50', icon: <CheckCircle size={14} /> };
      case 'pending': 
        return { label: 'Menunggu Pembayaran', btnLabel: 'Bayar Sesi', text: 'text-orange-600', bg: 'bg-orange-50', icon: <AlertCircle size={14} /> };
      default: 
        return { label: 'Sesi Selesai', btnLabel: 'Riwayat Chat', text: 'text-gray-500', bg: 'bg-gray-100', icon: <CheckCircle size={14} /> };
    }
  };

  // Handler Klik Button
  const handleActionClick = (item: ConsultationHistory) => {
    setActiveConsultation(item);
    if (item.status === 'pending') {
      setShowPayment(true);
    } else {
      setShowChatRoom(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      <div className="bg-white px-6 pt-8 pb-4 rounded-b-[2.5rem] shadow-sm sticky top-0 z-30">
        <h1 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Konsultasi</h1>
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
          <div className="flex items-center gap-3 bg-white border border-gray-100 shadow-sm rounded-2xl px-5 py-4 mb-4">
            <Search size={20} className="text-gray-400" />
            <input type="text" placeholder="Cari nama ahli..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent flex-1 outline-none text-sm font-medium" />
          </div>
          <div className="space-y-4">
            {filteredExperts.map(expert => (
              <ExpertCard key={expert.id} expert={expert} onConsultClick={onExpertClick} />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-5">
          {dummyHistory.map((item) => {
            const config = getSessionConfig(item.status);
            return (
              <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
                <div className={`flex items-center gap-2 px-6 py-3 ${config.bg} ${config.text} text-[10px] font-black uppercase tracking-widest`}>
                  {config.icon} {config.label}
                </div>
                <div className="p-6">
                  <div className="flex gap-4 mb-5">
                    <img src={item.expertImage} className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="" />
                    <div className="flex-1">
                      <h4 className="font-extrabold text-gray-900 text-base leading-tight">{item.expertName}</h4>
                      <p className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 mt-1.5">
                        <Calendar size={13} className="text-gray-300" /> {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-100">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Biaya</p>
                      <p className="text-base font-black text-gray-900">{formatPrice(item.price)}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleActionClick(item)}
                      className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase flex items-center gap-2 transition-all shadow-lg 
                        ${item.status === 'pending' ? 'bg-orange-500 text-white shadow-orange-100 active:bg-orange-600' : 
                          item.status === 'completed' ? 'bg-gray-100 text-gray-500 shadow-none active:bg-gray-200' : 
                          'bg-green-600 text-white shadow-green-100 active:bg-green-700'}`}
                    >
                      {item.status === 'pending' && <CreditCard size={14} />}
                      {config.btnLabel}
                      {item.status !== 'pending' && <ChevronRight size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- MODAL CHAT ROOM --- */}
      {showChatRoom && activeConsultation && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-white sticky top-0 shadow-sm">
            <button onClick={() => setShowChatRoom(false)} className="p-2 bg-gray-50 rounded-full"><ArrowLeft size={24} /></button>
            <div className="flex items-center gap-3 flex-1">
              <img src={activeConsultation.expertImage} className="w-10 h-10 rounded-full object-cover" alt="" />
              <div>
                <h4 className="font-black text-gray-900 text-sm leading-tight">{activeConsultation.expertName}</h4>
                <p className="text-[9px] font-black uppercase text-green-500">Sesi {activeConsultation.status}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
             <p className="text-center text-[10px] text-gray-400 uppercase font-black tracking-widest mb-8">Percakapan Dimulai</p>
             <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[80%]">
               <p className="text-sm text-gray-800">Halo, ada yang bisa saya bantu terkait konsultasi Anda?</p>
             </div>
          </div>
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-5 py-3">
              <input type="text" placeholder="Tulis pesan..." className="bg-transparent flex-1 outline-none text-sm" />
              <button className="bg-green-500 p-2 rounded-lg text-white"><Send size={18} /></button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL PEMBAYARAN --- */}
      {showPayment && activeConsultation && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPayment(false)} />
          <div className="relative bg-white w-full max-w-md rounded-t-[3rem] sm:rounded-[2.5rem] p-8 animate-in slide-in-from-bottom duration-300">
             <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><CreditCard size={28} /></div>
                <h3 className="text-xl font-black text-gray-900">Selesaikan Pembayaran</h3>
             </div>
             <div className="bg-gray-50 rounded-2xl p-5 mb-6 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-gray-400 font-bold">Ahli</span><span className="font-black text-gray-800">{activeConsultation.expertName}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400 font-bold">Total</span><span className="font-black text-green-600">{formatPrice(activeConsultation.price)}</span></div>
             </div>
             <button onClick={() => setShowPayment(false)} className="w-full py-4 bg-green-500 text-white rounded-2xl font-black uppercase tracking-widest">Bayar Sekarang</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultView;