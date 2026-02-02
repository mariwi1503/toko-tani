import React, { useState } from 'react';
import { X, Star, Plus, Minus, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product, formatPrice } from '@/data/dummyData';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-t-3xl max-h-[90vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between">
          <button 
            onClick={onClose} 
            className="p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:bg-white transition-colors"
          >
            <X size={24} className="text-gray-700" />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:bg-white transition-colors"
            >
              <Heart size={24} className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-700'} />
            </button>
            <button className="p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:bg-white transition-colors">
              <Share2 size={24} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-64 flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.originalPrice && (
            <span className="absolute bottom-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
              Hemat {formatPrice(product.originalPrice - product.price)}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Title and Price */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <div className="flex items-center gap-2 mb-2">
              <Star size={18} className="text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">{product.sold} terjual</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">Stok: {product.stock}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-green-600">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="flex gap-4 mb-4 py-4 border-y border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck size={18} className="text-green-500" />
              <span>Gratis Ongkir</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield size={18} className="text-green-500" />
              <span>Garansi</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <RotateCcw size={18} className="text-green-500" />
              <span>7 Hari Retur</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Deskripsi Produk</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-gray-800">Jumlah</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Minus size={18} className="text-gray-600" />
              </button>
              <span className="w-12 text-center font-bold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Plus size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-xl font-bold text-green-600">{formatPrice(product.price * quantity)}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
