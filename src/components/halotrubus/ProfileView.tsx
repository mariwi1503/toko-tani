import React from 'react';
import { 
  User, Settings, ShoppingBag, MessageCircle, Bookmark, Heart, 
  CreditCard, MapPin, Bell, HelpCircle, LogOut, ChevronRight,
  Edit2, LogIn
} from 'lucide-react';
import { formatPrice } from '@/data/dummyData';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'consumer' | 'expert';
  avatar: string;
  isVerified: boolean;
}

interface ProfileViewProps {
  userRole: 'consumer' | 'expert';
  onRoleChange: (role: 'consumer' | 'expert') => void;
  isLoggedIn: boolean;
  userData: UserData | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ 
  userRole, 
  onRoleChange, 
  isLoggedIn, 
  userData, 
  onLoginClick,
  onLogout 
}) => {
  const consumerMenuItems = [
    { icon: ShoppingBag, label: 'Pesanan Saya', badge: '2', color: 'text-green-500' },
    { icon: MessageCircle, label: 'Riwayat Konsultasi', badge: '3', color: 'text-blue-500' },
    { icon: Bookmark, label: 'Artikel Tersimpan', color: 'text-amber-500' },
    { icon: Heart, label: 'Wishlist', color: 'text-red-500' },
    { icon: CreditCard, label: 'Metode Pembayaran', color: 'text-purple-500' },
    { icon: MapPin, label: 'Alamat Pengiriman', color: 'text-cyan-500' },
  ];

  const expertMenuItems = [
    { icon: MessageCircle, label: 'Jadwal Konsultasi', badge: '5', color: 'text-green-500' },
    { icon: Edit2, label: 'Kelola Artikel', badge: '12', color: 'text-blue-500' },
    { icon: CreditCard, label: 'Pendapatan', color: 'text-purple-500' },
  ];

  const generalMenuItems = [
    { icon: Bell, label: 'Notifikasi', color: 'text-gray-500' },
    { icon: Settings, label: 'Pengaturan', color: 'text-gray-500' },
    { icon: HelpCircle, label: 'Bantuan', color: 'text-gray-500' },
  ];

  const menuItems = userRole === 'consumer' ? consumerMenuItems : expertMenuItems;

  const recentOrders = [
    { id: '1', status: 'processing', items: 3, total: 285000, date: '30 Jan 2026' },
    { id: '2', status: 'shipped', items: 1, total: 125000, date: '28 Jan 2026' },
  ];

  const upcomingConsultations = [
    { id: '1', client: 'Budi Santoso', time: '10:00', date: 'Hari ini', type: 'video' },
    { id: '2', client: 'Siti Aminah', time: '14:00', date: 'Hari ini', type: 'chat' },
    { id: '3', client: 'Ahmad Fauzan', time: '09:00', date: 'Besok', type: 'voice' },
  ];

  if (!isLoggedIn) {
    return (
      <div className="pb-20">
        <div className="bg-gradient-to-br from-green-600 to-green-500 px-4 pt-4 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-white text-xl font-bold">Profil</h1>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={40} className="text-gray-400" />
            </div>
            <h2 className="font-bold text-gray-800 text-lg mb-1">Selamat Datang!</h2>
            <p className="text-gray-500 text-sm mb-4">Masuk untuk mengakses semua fitur</p>
            <button
              onClick={onLoginClick}
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              Masuk / Daftar
            </button>
          </div>
        </div>

        <div className="px-4 mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">Fitur untuk Anda</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <ShoppingBag size={24} className="text-green-500 mb-2" />
              <h4 className="font-medium text-gray-800 text-sm">Belanja Mudah</h4>
              <p className="text-xs text-gray-500 mt-1">Beli bibit, pupuk, dan alat pertanian</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <MessageCircle size={24} className="text-blue-500 mb-2" />
              <h4 className="font-medium text-gray-800 text-sm">Konsultasi Ahli</h4>
              <p className="text-xs text-gray-500 mt-1">Tanya langsung ke ahli pertanian</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <Bookmark size={24} className="text-amber-500 mb-2" />
              <h4 className="font-medium text-gray-800 text-sm">Simpan Artikel</h4>
              <p className="text-xs text-gray-500 mt-1">Baca artikel kapan saja</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <Heart size={24} className="text-red-500 mb-2" />
              <h4 className="font-medium text-gray-800 text-sm">Wishlist</h4>
              <p className="text-xs text-gray-500 mt-1">Simpan produk favorit Anda</p>
            </div>
          </div>
        </div>

        <div className="px-4 mt-6 mb-4">
          <h3 className="font-semibold text-gray-800 mb-3">Umum</h3>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {generalMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                    index !== generalMenuItems.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${item.color}`}>
                    <Icon size={20} />
                  </div>
                  <span className="flex-1 text-left font-medium text-gray-700">{item.label}</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-center pb-4">
          <p className="text-xs text-gray-400">Halo Trubus v1.0.0</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-green-600 to-green-500 px-4 pt-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-xl font-bold">Profil</h1>
          <button className="p-2 bg-white/20 rounded-full">
            <Settings size={20} className="text-white" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={userData?.avatar || (userRole === 'consumer' 
                  ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
                  : 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200'
                )}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Edit2 size={12} className="text-white" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-800">
                {userData?.name || (userRole === 'consumer' ? 'Budi Santoso' : 'Dr. Bambang Supriyadi')}
              </h2>
              <p className="text-sm text-gray-500">
                {userData?.email || (userRole === 'consumer' ? 'budi.santoso@email.com' : 'dr.bambang@email.com')}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  userRole === 'consumer' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {userRole === 'consumer' ? 'Konsumen' : 'Ahli Pertanian'}
                </span>
                {userData?.isVerified && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-600">
                    Terverifikasi
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Demo: Ganti Role</p>
            <div className="flex gap-2">
              <button
                onClick={() => onRoleChange('consumer')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  userRole === 'consumer'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Konsumen
              </button>
              <button
                onClick={() => onRoleChange('expert')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  userRole === 'expert'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Ahli
              </button>
            </div>
          </div>
        </div>
      </div>

      {userRole === 'consumer' ? (
        <div className="px-4 -mt-4">
          <div className="bg-white rounded-xl shadow-sm p-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className="text-xs text-gray-500">Pesanan</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-2xl font-bold text-blue-600">5</p>
              <p className="text-xs text-gray-500">Konsultasi</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">28</p>
              <p className="text-xs text-gray-500">Artikel Dibaca</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 -mt-4">
          <div className="bg-white rounded-xl shadow-sm p-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">2,456</p>
              <p className="text-xs text-gray-500">Konsultasi</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-xs text-gray-500">Artikel</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">4.9</p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
          </div>
        </div>
      )}

      {userRole === 'consumer' && (
        <div className="px-4 mt-4">
          <h3 className="font-semibold text-gray-800 mb-3">Pesanan Terbaru</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">#{order.id} • {order.date}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'processing' 
                      ? 'bg-amber-100 text-amber-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {order.status === 'processing' ? 'Diproses' : 'Dikirim'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{order.items} item</span>
                  <span className="font-semibold text-green-600">{formatPrice(order.total)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {userRole === 'expert' && (
        <div className="px-4 mt-4">
          <h3 className="font-semibold text-gray-800 mb-3">Jadwal Hari Ini</h3>
          <div className="space-y-3">
            {upcomingConsultations.map((consult) => (
              <div key={consult.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  consult.type === 'video' ? 'bg-blue-100' :
                  consult.type === 'voice' ? 'bg-green-100' : 'bg-amber-100'
                }`}>
                  <MessageCircle size={20} className={
                    consult.type === 'video' ? 'text-blue-600' :
                    consult.type === 'voice' ? 'text-green-600' : 'text-amber-600'
                  } />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{consult.client}</p>
                  <p className="text-sm text-gray-500">{consult.date} • {consult.time}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">
                  {consult.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 mt-6">
        <h3 className="font-semibold text-gray-800 mb-3">
          {userRole === 'consumer' ? 'Menu Saya' : 'Menu Ahli'}
        </h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${item.color}`}>
                  <Icon size={20} />
                </div>
                <span className="flex-1 text-left font-medium text-gray-700">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-4">
        <h3 className="font-semibold text-gray-800 mb-3">Umum</h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {generalMenuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                  index !== generalMenuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${item.color}`}>
                  <Icon size={20} />
                </div>
                <span className="flex-1 text-left font-medium text-gray-700">{item.label}</span>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-4 mb-4">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
        >
          <LogOut size={20} />
          Keluar
        </button>
      </div>

      <div className="text-center pb-4">
        <p className="text-xs text-gray-400">Halo Trubus v1.0.0</p>
      </div>
    </div>
  );
};

export default ProfileView;
