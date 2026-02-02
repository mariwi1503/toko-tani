import React, { useState } from 'react';
import { X, Star, MessageCircle, Clock, Calendar, Video, Phone, ChevronRight } from 'lucide-react';
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
  const [consultationType, setConsultationType] = useState<'chat' | 'video' | 'voice'>('chat');
  const [step, setStep] = useState(1);

  if (!isOpen || !expert) return null;

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.toLocaleDateString('id-ID', { weekday: 'short' }),
      date: date.getDate(),
      full: date.toISOString().split('T')[0]
    };
  });

  const times = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '19:00', '20:00'];

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      onBookConsultation(expert, selectedDate, selectedTime, consultationType);
      setStep(1);
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const typeOptions = [
    { id: 'chat', label: 'Chat', icon: MessageCircle, price: expert.price },
    { id: 'voice', label: 'Voice Call', icon: Phone, price: expert.price * 1.5 },
    { id: 'video', label: 'Video Call', icon: Video, price: expert.price * 2 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-t-3xl max-h-[90vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            {step === 1 ? 'Profil Ahli' : step === 2 ? 'Pilih Jadwal' : 'Konfirmasi'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {step === 1 && (
            <div className="p-4">
              {/* Expert Profile */}
              <div className="flex gap-4 mb-4">
                <div className="relative">
                  <img 
                    src={expert.image} 
                    alt={expert.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${
                    expert.isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{expert.name}</h3>
                  <p className="text-green-600 font-medium">{expert.specialization}</p>
                  <p className="text-sm text-gray-500">{expert.education}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{expert.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-500">{expert.consultations}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-500">{expert.experience} thn</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Tentang</h4>
                <p className="text-sm text-gray-600">{expert.bio}</p>
              </div>

              {/* Consultation Type */}
              <h4 className="font-semibold text-gray-800 mb-3">Pilih Jenis Konsultasi</h4>
              <div className="space-y-2">
                {typeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setConsultationType(option.id as 'chat' | 'video' | 'voice')}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        consultationType === option.id 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          consultationType === option.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon size={20} />
                        </div>
                        <span className="font-medium text-gray-800">{option.label}</span>
                      </div>
                      <span className="font-bold text-green-600">{formatPrice(option.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-4">
              {/* Date Selection */}
              <h4 className="font-semibold text-gray-800 mb-3">Pilih Tanggal</h4>
              <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                {dates.map((d) => (
                  <button
                    key={d.full}
                    onClick={() => setSelectedDate(d.full)}
                    className={`flex flex-col items-center min-w-[60px] p-3 rounded-xl transition-all ${
                      selectedDate === d.full 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-xs font-medium">{d.day}</span>
                    <span className="text-lg font-bold">{d.date}</span>
                  </button>
                ))}
              </div>

              {/* Time Selection */}
              <h4 className="font-semibold text-gray-800 mb-3">Pilih Waktu</h4>
              <div className="grid grid-cols-4 gap-2">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-xl font-medium transition-all ${
                      selectedTime === time 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="p-4">
              <div className="bg-green-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">Ringkasan Konsultasi</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ahli</span>
                    <span className="font-medium text-gray-800">{expert.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spesialisasi</span>
                    <span className="font-medium text-gray-800">{expert.specialization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal</span>
                    <span className="font-medium text-gray-800">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waktu</span>
                    <span className="font-medium text-gray-800">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jenis</span>
                    <span className="font-medium text-gray-800 capitalize">{consultationType}</span>
                  </div>
                  <div className="border-t border-green-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-800">Total</span>
                      <span className="font-bold text-green-600">
                        {formatPrice(
                          consultationType === 'chat' ? expert.price :
                          consultationType === 'voice' ? expert.price * 1.5 :
                          expert.price * 2
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-white">
          {step === 1 && (
            <button
              onClick={() => setStep(2)}
              disabled={!expert.isOnline}
              className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${
                expert.isOnline 
                  ? 'bg-green-500 text-white hover:bg-green-600 active:scale-[0.98]' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {expert.isOnline ? (
                <>
                  Pilih Jadwal
                  <ChevronRight size={20} />
                </>
              ) : (
                'Ahli Sedang Offline'
              )}
            </button>
          )}
          {step === 2 && (
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className={`flex-1 py-4 rounded-xl font-semibold transition-colors ${
                  selectedDate && selectedTime 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Lanjutkan
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={handleBook}
                className="flex-1 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors active:scale-[0.98]"
              >
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
