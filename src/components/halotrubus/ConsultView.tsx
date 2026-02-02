import React, { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { experts, Expert } from '@/data/dummyData';
import ExpertCard from './ExpertCard';

interface ConsultViewProps {
  onExpertClick: (expert: Expert) => void;
}

const specializations = [
  'Semua',
  'Tanaman Pangan',
  'Hidroponik',
  'Hama & Penyakit',
  'Tanaman Hias',
  'Perkebunan',
  'Pertanian Organik',
  'Irigasi & Pengairan',
  'Bioteknologi Pertanian',
  'Agribisnis',
  'Sayuran & Buah'
];

const ConsultView: React.FC<ConsultViewProps> = ({ onExpertClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('Semua');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredExperts = useMemo(() => {
    let filtered = [...experts];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by specialization
    if (selectedSpec !== 'Semua') {
      filtered = filtered.filter(e => e.specialization === selectedSpec);
    }

    // Filter by online status
    if (showOnlineOnly) {
      filtered = filtered.filter(e => e.isOnline);
    }

    // Sort by online status first, then by rating
    filtered.sort((a, b) => {
      if (a.isOnline && !b.isOnline) return -1;
      if (!a.isOnline && b.isOnline) return 1;
      return b.rating - a.rating;
    });

    return filtered;
  }, [searchQuery, selectedSpec, showOnlineOnly]);

  const onlineCount = experts.filter(e => e.isOnline).length;

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-500 px-4 pt-4 pb-6">
        <h1 className="text-white text-xl font-bold mb-1">Konsultasi Ahli</h1>
        <p className="text-white/80 text-sm mb-4">Tanya langsung ke ahli pertanian berpengalaman</p>
        
        {/* Search */}
        <div className="flex items-center gap-3 bg-white rounded-full px-4 py-3">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Cari ahli atau spesialisasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}>
              <X size={18} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Online Status */}
      <div className="px-4 py-3 flex items-center justify-between bg-green-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-700">
            <span className="font-semibold text-green-600">{onlineCount}</span> ahli sedang online
          </span>
        </div>
        <button
          onClick={() => setShowOnlineOnly(!showOnlineOnly)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            showOnlineOnly
              ? 'bg-green-500 text-white'
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          {showOnlineOnly ? 'Online Saja' : 'Tampilkan Semua'}
        </button>
      </div>

      {/* Specialization Filter */}
      <div className="px-4 py-3 overflow-x-auto border-b border-gray-100">
        <div className="flex gap-2">
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpec(spec)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedSpec === spec
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-4 py-3">
        <p className="text-sm text-gray-500 mb-4">
          Menampilkan {filteredExperts.length} ahli
        </p>

        {filteredExperts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Search size={64} className="text-gray-300 mb-4" />
            <p className="text-gray-500 text-center">Ahli tidak ditemukan</p>
            <p className="text-gray-400 text-sm text-center mt-1">Coba kata kunci lain</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredExperts.map((expert) => (
              <ExpertCard
                key={expert.id}
                expert={expert}
                onConsultClick={onExpertClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Help Banner */}
      <div className="px-4 mt-4 mb-4">
        <div className="bg-blue-50 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-1">Butuh Bantuan?</h3>
          <p className="text-sm text-blue-600 mb-3">
            Tidak yakin ahli mana yang tepat? Tim kami siap membantu mengarahkan Anda.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors">
            Hubungi Customer Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultView;
