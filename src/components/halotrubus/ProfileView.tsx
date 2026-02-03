import React from 'react';
import { 
  User, Settings, ShoppingBag, MessageCircle, Bookmark, Heart, 
  CreditCard, MapPin, Bell, HelpCircle, LogOut, ChevronRight,
  Edit2, LogIn, ShieldCheck, Star, FileText, Wallet
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
    { icon: ShoppingBag, label: 'Pesanan Saya', badge: '2', color: 'text-green-600', bg: 'bg-green-50' },
    { icon: MessageCircle, label: 'Riwayat Konsultasi', badge: '3', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Heart, label: 'Produk Favorit', color: 'text-red-600', bg: 'bg-red-50' },
    { icon: CreditCard, label: 'Metode Pembayaran', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const expertMenuItems = [
    { icon: MessageCircle, label: 'Sesi Konsultasi', badge: '5', color: 'text-green-600', bg: 'bg-green-50' },
    { icon: FileText, label: 'Artikel Saya', badge: '12', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Wallet, label: 'Dompet & Pendapatan', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const generalMenuItems = [
    { icon: Bell, label: 'Notifikasi', color: 'text-gray-400', bg: 'bg-gray-50' },
    { icon: Settings, label: 'Pengaturan', color: 'text-gray-400', bg: 'bg-gray-50' },
    { icon: HelpCircle, label: 'Pusat Bantuan', color: 'text-gray-400', bg: 'bg-gray-50' },
  ];

  const menuItems = userRole === 'consumer' ? consumerMenuItems : expertMenuItems;

  // Render State: Not Logged In
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24 font-sans animate-in fade-in duration-500">
        <div className="bg-white px-6 pt-12 pb-10 rounded-b-[3rem] shadow-sm">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
              <User size={48} className="text-gray-300" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">Mulai Perjalanan Anda</h1>
            <p className="text-gray-400 text-sm mb-8 font-medium">Masuk untuk akses konsultasi ahli dan belanja kebutuhan tani</p>
            <button
              onClick={onLoginClick}
              className="w-full py-4 bg-green-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-green-100 hover:bg-green-600 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <LogIn size={20} /> Masuk Sekarang
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-50">
             <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center mb-3"><ShoppingBag size={20}/></div>
             <h4 className="font-black text-gray-800 text-xs uppercase tracking-tight">Belanja Mudah</h4>
             <p className="text-[10px] text-gray-400 mt-1 font-bold">Pupuk & Bibit Unggul</p>
          </div>
          <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100">
             <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-3"><MessageCircle size={20}/></div>
             <h4 className="font-black text-gray-800 text-xs uppercase tracking-tight">Konsultasi</h4>
             <p className="text-[10px] text-gray-400 mt-1 font-bold">Tanya Langsung Ahli</p>
          </div>
        </div>
      </div>
    );
  }

  // Render State: Logged In
  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans animate-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header Card */}
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-[3rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 z-0" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Profil Saya</h1>
            <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-green-500 transition-colors">
              <Settings size={20} />
            </button>
          </div>

          <div className="flex items-center gap-5 mb-8">
            <div className="relative">
              <img 
                src={userData?.avatar || (userRole === 'consumer' 
                  ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
                  : 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200'
                )}
                alt="Profile"
                className="w-20 h-20 rounded-[2rem] object-cover ring-4 ring-gray-50 shadow-md"
              />
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-xl flex items-center justify-center shadow-lg">
                <Edit2 size={12} className="text-white" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-black text-xl text-gray-900 leading-tight">
                  {userData?.name || (userRole === 'consumer' ? 'Budi Santoso' : 'Dr. Bambang S.')}
                </h2>
                {userData?.isVerified !== false && <ShieldCheck size={18} className="text-blue-500" />}
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {userRole === 'consumer' ? 'Petani Milenial' : 'Spesialis Hidroponik'}
              </p>
            </div>
          </div>

          {/* Role Switcher - Style Tab yang sama dengan Modal */}
          <div className="bg-gray-100 p-1.5 rounded-[1.5rem] flex">
            <button
              onClick={() => onRoleChange('consumer')}
              className={`flex-1 py-3 rounded-[1.2rem] text-xs font-black uppercase tracking-wider transition-all ${
                userRole === 'consumer' ? 'bg-white text-green-600 shadow-md' : 'text-gray-400'
              }`}
            >
              Konsumen
            </button>
            <button
              onClick={() => onRoleChange('expert')}
              className={`flex-1 py-3 rounded-[1.2rem] text-xs font-black uppercase tracking-wider transition-all ${
                userRole === 'expert' ? 'bg-white text-green-600 shadow-md' : 'text-gray-400'
              }`}
            >
              Ahli
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-6 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-6 flex justify-between border border-gray-50">
          <div className="text-center flex-1">
            <p className="text-lg font-black text-gray-900">{userRole === 'consumer' ? '12' : '2.4k'}</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sesi</p>
          </div>
          <div className="w-px bg-gray-100 mx-2" />
          <div className="text-center flex-1">
            <p className="text-lg font-black text-gray-900">{userRole === 'consumer' ? '5' : '12'}</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{userRole === 'consumer' ? 'Order' : 'Artikel'}</p>
          </div>
          <div className="w-px bg-gray-100 mx-2" />
          <div className="text-center flex-1">
            <p className="text-lg font-black text-gray-900">{userRole === 'consumer' ? '28' : '4.9'}</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{userRole === 'consumer' ? 'Simpan' : 'Rating'}</p>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="p-6 space-y-8">
        {/* Main Menu */}
        <div>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-2">Aktivitas Saya</h3>
          <div className="bg-white rounded-[2.2rem] shadow-sm overflow-hidden border border-gray-100">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-all active:scale-[0.98] ${
                    index !== menuItems.length - 1 ? 'border-b border-gray-50' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shadow-sm`}>
                    <Icon size={22} />
                  </div>
                  <span className="flex-1 text-left font-extrabold text-gray-700 text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg shadow-red-100">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight size={18} className="text-gray-300" />
                </button>
              );
            })}
          </div>
        </div>

        {/* General Menu */}
        <div>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-2">Dukungan</h3>
          <div className="bg-white rounded-[2.2rem] shadow-sm overflow-hidden border border-gray-100">
            {generalMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-all ${
                    index !== generalMenuItems.length - 1 ? 'border-b border-gray-50' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center`}>
                    <Icon size={22} />
                  </div>
                  <span className="flex-1 text-left font-extrabold text-gray-700 text-sm">{item.label}</span>
                  <ChevronRight size={18} className="text-gray-300" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 p-5 bg-red-50 text-red-600 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-red-100 transition-all active:scale-95 border border-red-100/50"
        >
          <LogOut size={18} /> Keluar Akun
        </button>

        <div className="text-center pt-4 pb-10">
          <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest">Halo Trubus Premium v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;