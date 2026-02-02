import React from 'react';
import { Search, ShoppingCart, Bell } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  onCartClick: () => void;
  cartCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onSearchClick,
  onCartClick,
  cartCount,
  searchQuery,
  onSearchChange,
  showSearch = true
}) => {
  return (
    <header className="sticky top-0 bg-white z-40 shadow-sm">
      <div className="max-w-lg mx-auto px-4 py-3">
        {/* Logo and Actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/6980194cc3fba0d6df17a964_1770002796949_b36564b6.png" 
              alt="Halo Trubus" 
              className="h-10 object-contain"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
              <Bell size={24} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-0 -right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div 
            onClick={onSearchClick}
            className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-3 cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <Search size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Cari bibit, pupuk, alat..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
