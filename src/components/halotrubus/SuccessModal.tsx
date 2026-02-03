import React from 'react';
import { CheckCircle, X, ShoppingBag, Calendar } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'cart' | 'consultation' | 'checkout';
  message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, type, message }) => {
  if (!isOpen) return null;

  const content = {
    cart: {
      icon: ShoppingBag,
      title: 'Berhasil Ditambahkan!',
      description: message || 'Produk telah ditambahkan ke keranjang belanja.',
      buttonText: 'Lanjut Belanja',
      color: 'green'
    },
    consultation: {
      icon: Calendar,
      title: 'Konsultasi Dipesan!',
      description: message || 'Konsultasi sudah dipesan',
      buttonText: 'Lihat Detail',
      color: 'blue'
    },
    checkout: {
      icon: CheckCircle,
      title: 'Pesanan Berhasil!',
      description: message || 'Terima kasih! Pesanan Anda sedang diproses dan akan segera dikirim.',
      buttonText: 'Lihat Pesanan',
      color: 'green'
    }
  };

  const { icon: Icon, title, description, buttonText, color } = content[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-sm rounded-2xl p-6 text-center animate-scale-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-400" />
        </button>
        
        <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
          color === 'green' ? 'bg-green-100' : 'bg-blue-100'
        }`}>
          <Icon size={40} className={color === 'green' ? 'text-green-500' : 'text-blue-500'} />
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <button
          onClick={onClose}
          className={`w-full py-3 rounded-xl font-semibold transition-colors ${
            color === 'green' 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
