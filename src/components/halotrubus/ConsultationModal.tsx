import React, { useState } from 'react';
import { 
  X, Star, MessageCircle, 
  GraduationCap, Briefcase, ChevronRight, 
  Award, CheckCircle2, ShieldCheck, Zap, CreditCard, Wallet
} from 'lucide-react';
import { Expert, formatPrice } from '@/data/dummyData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  expert: Expert | null;
  onBookConsultation: (expert: Expert, date: string, time: string, type: string) => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  expert,
  onBookConsultation
}) => {
  const [step, setStep] = useState(1);

  if (!isOpen || !expert) return null;

  const handleBook = () => {
    onBookConsultation(expert, 'Hari ini (Instan)', 'Sekarang', 'chat');
    setTimeout(() => {
      setStep(1);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[3rem] max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500">
        
        {/* Progress Bar (Visual Indicator) */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100 flex">
          <div className={`h-full bg-green-500 transition-all duration-500 ${step === 1 ? 'w-1/2' : 'w-full'}`} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 pt-8 border-b border-gray-50 bg-white">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              {step === 1 ? 'Detail Profil' : 'Konfirmasi'}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-green-500 animate-pulse' : 'bg-green-500'}`} />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Langkah {step} dari 2
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all text-gray-400 hover:text-gray-900 group">
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          {step === 1 && (
            <div className="p-6 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Profile Card dengan Background Decor */}
              <div className="relative bg-gray-50 p-6 rounded-[2.5rem] overflow-hidden border border-gray-100">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl" />
                <div className="flex gap-6 relative z-10">
                  <div className="relative shrink-0">
                    <img src={expert.image} alt={expert.name} className="w-24 h-24 rounded-[2rem] object-cover ring-4 ring-white shadow-xl" />
                    <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-lg border border-gray-50">
                      <Zap size={14} className="text-yellow-500 fill-yellow-500" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-black text-gray-900 leading-tight">{expert.name}</h3>
                    <p className="text-green-600 font-bold text-sm">{expert.specialization}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center gap-1 text-[10px] font-black bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg">
                        <Star size={10} className="fill-yellow-900" /> {expert.rating}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-black bg-blue-500 text-white px-2 py-1 rounded-lg uppercase tracking-tighter">
                        Verified Expert
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid Info Cepat */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                  <Briefcase size={20} className="text-blue-500 mb-2" />
                  <span className="text-[9px] font-bold text-gray-400 uppercase">Pengalaman</span>
                  <p className="text-xs font-black text-gray-800">{expert.experience} Thn</p>
                </div>
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                  <Award size={20} className="text-green-500 mb-2" />
                  <span className="text-[9px] font-bold text-gray-400 uppercase">Sesi Chat</span>
                  <p className="text-xs font-black text-gray-800">{expert.consultations}+</p>
                </div>
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                  <Zap size={20} className="text-yellow-500 mb-2" />
                  <span className="text-[9px] font-bold text-gray-400 uppercase">Respon</span>
                  <p className="text-xs font-black text-gray-800">Cepat</p>
                </div>
              </div>

              {/* Bio & Education */}
              <div className="space-y-4 px-2">
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Bio Ahli</h4>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">
                    {expert.bio}
                  </p>
                </div>
                <div className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                  <GraduationCap className="text-blue-600 shrink-0" size={20} />
                  <p className="text-xs font-bold text-blue-900 leading-tight">Lulusan {expert.education}</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-6 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <ShieldCheck size={120} />
                </div>
                
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Ringkasan Pembayaran</h4>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 text-green-600 rounded-xl">
                        <MessageCircle size={18} />
                      </div>
                      <span className="text-sm font-bold text-gray-600">Sesi Chat Instan</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">{formatPrice(expert.price)}</span>
                  </div>
                  
                  <div className="h-px bg-gray-200 border-dashed border-t" />
                  
                  <div className="flex justify-between items-end pt-2">
                    <div>
                      <p className="text-xs font-bold text-gray-400">Total Pembayaran</p>
                      <p className="text-3xl font-black text-green-600 tracking-tighter">
                        {formatPrice(expert.price)}
                      </p>
                    </div>
                    <CheckCircle2 className="text-green-500 mb-1" size={32} />
                  </div>
                </div>
              </div>

              {/* Placeholder Metode Pembayaran (UI Only) */}
              <div className="px-2">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Metode Tersedia</h4>
                <div className="flex gap-4 opacity-40">
                  <Wallet size={20} />
                  <CreditCard size={20} />
                  <div className="font-black text-sm italic">E-WALLETS</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-700">
                <ShieldCheck size={20} className="shrink-0" />
                <p className="text-[10px] font-bold leading-tight">
                  Pembayaran Anda aman & terenkripsi. Sesi chat akan langsung terbuka setelah konfirmasi.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-white border-t border-gray-50">
          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              disabled={!expert.isOnline}
              className="group relative w-full py-5 bg-green-500 hover:bg-green-600 disabled:bg-gray-200 text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] transition-all shadow-xl shadow-green-200 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              <span className="flex items-center justify-center gap-2">
                {expert.isOnline ? 'Lanjut Bayar' : 'Offline'}
                <ChevronRight size={18} />
              </span>
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="px-8 py-5 bg-gray-50 text-gray-400 hover:text-gray-900 font-black uppercase text-xs tracking-widest rounded-[2rem] transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleBook}
                className="flex-1 py-5 bg-green-600 text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-green-700 shadow-xl shadow-green-100 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Zap size={16} className="fill-white" />
                Bayar Sekarang
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;