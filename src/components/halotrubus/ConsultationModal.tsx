import React, { useState } from 'react';
import { 
  X, Star, MessageCircle, Clock, Video, 
  GraduationCap, Briefcase, ChevronRight, 
  Award, Calendar as CalendarIcon, CheckCircle2 
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
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'chat' | 'call'>('chat');
  const [step, setStep] = useState(1);

  if (!isOpen || !expert) return null;

  // Generate 7 hari ke depan untuk pilihan jadwal Call
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.toLocaleDateString('id-ID', { weekday: 'short' }),
      date: date.getDate(),
      full: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };
  });

  const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '19:00', '20:00'];

  const handleNextStep = () => {
    if (consultationType === 'chat') {
      setStep(3); // Langsung ke konfirmasi pembayaran
    } else {
      setStep(2); // Ke pemilihan jadwal
    }
  };

  const handleBook = () => {
    const finalDate = consultationType === 'chat' ? 'Hari ini (Instan)' : selectedDate;
    const finalTime = consultationType === 'chat' ? 'Sekarang' : selectedTime;
    
    onBookConsultation(expert, finalDate, finalTime, consultationType);
    // Reset state setelah booking
    setTimeout(() => {
      setStep(1);
      setSelectedDate('');
      setSelectedTime('');
      onClose();
    }, 500);
  };

  const typeOptions = [
    { 
      id: 'chat', 
      label: 'Chat Konsultasi', 
      icon: MessageCircle, 
      price: expert.price, 
      desc: 'Respon cepat via teks' 
    },
    { 
      id: 'call', 
      label: 'Video/Voice Call', 
      icon: Video, 
      price: expert.price * 1.5, 
      desc: 'Tatap muka virtual' 
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2rem] max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-extrabold text-gray-800">
              {step === 1 ? 'Profil Ahli' : step === 2 ? 'Atur Jadwal' : 'Konfirmasi'}
            </h2>
            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mt-0.5">
              Step {step} of 3
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          {step === 1 && (
            <div className="p-6 space-y-6">
              {/* Profile Card */}
              <div className="flex gap-5">
                <div className="relative shrink-0">
                  <img src={expert.image} alt={expert.name} className="w-24 h-24 rounded-3xl object-cover ring-4 ring-white shadow-lg" />
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 border-4 border-white rounded-full ${expert.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{expert.name}</h3>
                  <p className="text-green-600 font-bold text-sm mb-2">{expert.specialization}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg">
                      <Star size={12} className="fill-yellow-700" /> {expert.rating}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">
                      <Briefcase size={12} /> {expert.experience} thn
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Tentang Ahli</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {expert.bio}
                </p>
              </div>

              {/* Grid Info: Education & Experience */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <GraduationCap size={20} className="text-green-500 mb-2" />
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase">Pendidikan</h4>
                  <p className="text-xs font-bold text-gray-800 line-clamp-2">{expert.education}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <Award size={20} className="text-green-500 mb-2" />
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase">Total Konsultasi</h4>
                  <p className="text-xs font-bold text-gray-800">{expert.consultations}+</p>
                </div>
              </div>

              {/* Consultation Type Selector */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Pilih Metode</h4>
                <div className="grid grid-cols-2 gap-4">
                  {typeOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setConsultationType(option.id as 'chat' | 'call')}
                      className={`relative flex flex-col items-center p-4 rounded-3xl border-2 transition-all duration-200 ${
                        consultationType === option.id 
                        ? 'border-green-500 bg-green-50 ring-4 ring-green-500/10' 
                        : 'border-gray-100 bg-white hover:border-gray-200'
                      }`}
                    >
                      {consultationType === option.id && (
                        <CheckCircle2 size={18} className="absolute top-2 right-2 text-green-500 fill-white" />
                      )}
                      <div className={`p-3 rounded-2xl mb-2 ${consultationType === option.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <option.icon size={24} />
                      </div>
                      <span className="text-sm font-bold text-gray-800">{option.label}</span>
                      <span className="text-xs font-bold text-green-600 mt-1">{formatPrice(option.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-6 space-y-6 animate-in fade-in slide-in-from-right-4">
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <CalendarIcon size={18} className="text-green-500" /> Pilih Tanggal
                </h4>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {dates.map((d) => (
                    <button
                      key={d.full}
                      onClick={() => setSelectedDate(d.full)}
                      className={`flex flex-col items-center min-w-[70px] py-4 rounded-2xl border-2 transition-all ${
                        selectedDate === d.full 
                        ? 'border-green-500 bg-green-500 text-white shadow-lg shadow-green-200' 
                        : 'border-transparent bg-white text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase mb-1">{d.day}</span>
                      <span className="text-xl font-black">{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock size={18} className="text-green-500" /> Waktu Tersedia (WIB)
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-xl font-bold text-sm transition-all ${
                        selectedTime === time 
                        ? 'bg-green-500 text-white shadow-md' 
                        : 'bg-white text-gray-600 border border-gray-100 hover:border-green-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="p-6 animate-in fade-in slide-in-from-right-4">
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-dashed border-gray-200">
                  <h4 className="font-bold text-gray-800">Detail Pembayaran</h4>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full uppercase">
                    {consultationType}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-medium">Layanan</span>
                    <span className="text-gray-800 font-bold">Konsultasi {consultationType === 'chat' ? 'Chat' : 'Call'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-medium">Ahli</span>
                    <span className="text-gray-800 font-bold">{expert.name}</span>
                  </div>
                  
                  {consultationType === 'call' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 font-medium">Jadwal</span>
                      <span className="text-gray-800 font-bold text-right">{selectedDate}, {selectedTime}</span>
                    </div>
                  )}

                  <div className="pt-4 mt-2 border-t border-gray-100 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Harga</p>
                      <p className="text-2xl font-black text-green-600">
                        {formatPrice(consultationType === 'chat' ? expert.price : expert.price * 1.5)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-[10px] text-center text-gray-400 mt-6 px-4">
                Dengan menekan tombol bayar, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami.
              </p>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-6 bg-white border-t border-gray-100">
          {step === 1 ? (
            <button
              onClick={handleNextStep}
              disabled={!expert.isOnline && consultationType === 'chat'}
              className="w-full py-4.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-200 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-green-200 active:scale-95 py-4"
            >
              {consultationType === 'chat' ? 'Lanjut Konsultasi' : 'Pilih Jadwal'}
              <ChevronRight size={20} />
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setStep(step === 3 && consultationType === 'chat' ? 1 : step - 1)}
                className="px-6 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={step === 2 ? () => setStep(3) : handleBook}
                disabled={step === 2 && (!selectedDate || !selectedTime)}
                className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 disabled:bg-gray-200 shadow-lg shadow-green-100 transition-all active:scale-95"
              >
                {step === 2 ? 'Konfirmasi Jadwal' : 'Bayar & Konfirmasi'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;