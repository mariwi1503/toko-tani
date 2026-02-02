import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product, formatPrice } from '@/data/dummyData';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onProductClick }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div 
      onClick={() => onProductClick(product)}
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-32 object-cover"
        />
        {product.originalPrice && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1 min-h-[40px]">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-400">| {product.sold} terjual</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-600 font-bold text-sm">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-gray-400 text-xs line-through">{formatPrice(product.originalPrice)}</p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors active:scale-95"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
