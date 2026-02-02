import React from 'react';
import { Star, MessageCircle, Clock } from 'lucide-react';
import { Expert, formatPrice } from '@/data/dummyData';

interface ExpertCardProps {
  expert: Expert;
  onConsultClick: (expert: Expert) => void;
  variant?: 'default' | 'compact';
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert, onConsultClick, variant = 'default' }) => {
  if (variant === 'compact') {
    return (
      <div 
        onClick={() => onConsultClick(expert)}
        className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-all min-w-[160px]"
      >
        <div className="relative mb-2">
          <img 
            src={expert.image} 
            alt={expert.name}
            className="w-16 h-16 rounded-full object-cover mx-auto"
          />
          <span className={`absolute bottom-0 right-1/2 translate-x-6 w-4 h-4 rounded-full border-2 border-white ${
            expert.isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`} />
        </div>
        <h3 className="text-sm font-semibold text-gray-800 text-center line-clamp-1">{expert.name}</h3>
        <p className="text-xs text-gray-500 text-center line-clamp-1">{expert.specialization}</p>
        <div className="flex items-center justify-center gap-1 mt-1">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-600">{expert.rating}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="p-4">
        <div className="flex gap-4">
          <div className="relative">
            <img 
              src={expert.image} 
              alt={expert.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
              expert.isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{expert.name}</h3>
            <p className="text-sm text-green-600 font-medium">{expert.specialization}</p>
            <p className="text-xs text-gray-500 mt-1">{expert.experience} tahun pengalaman</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-700">{expert.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={14} className="text-gray-400" />
                <span className="text-sm text-gray-500">{expert.consultations}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Mulai dari</p>
            <p className="text-green-600 font-bold">{formatPrice(expert.price)}</p>
          </div>
          <button
            onClick={() => onConsultClick(expert)}
            disabled={!expert.isOnline}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
              expert.isOnline 
                ? 'bg-green-500 text-white hover:bg-green-600 active:scale-95' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {expert.isOnline ? 'Konsultasi' : 'Offline'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;
