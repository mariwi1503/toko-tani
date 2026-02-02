import React from 'react';
import { ChevronRight, Leaf, Sprout, FlaskConical, Bug, Wrench } from 'lucide-react';
import { products, experts, articles, categories, Product, Expert, Article } from '@/data/dummyData';
import ProductCard from './ProductCard';
import ExpertCard from './ExpertCard';
import ArticleCard from './ArticleCard';

interface HomeViewProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onExpertClick: (expert: Expert) => void;
  onArticleClick: (article: Article) => void;
  onCategoryClick: (category: string) => void;
  onViewAllProducts: () => void;
  onViewAllExperts: () => void;
  onViewAllArticles: () => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  seeds: <Sprout size={24} />,
  plants: <Leaf size={24} />,
  fertilizers: <FlaskConical size={24} />,
  pesticides: <Bug size={24} />,
  tools: <Wrench size={24} />
};

const HomeView: React.FC<HomeViewProps> = ({
  onProductClick,
  onAddToCart,
  onExpertClick,
  onArticleClick,
  onCategoryClick,
  onViewAllProducts,
  onViewAllExperts,
  onViewAllArticles
}) => {
  const featuredProducts = products.filter(p => p.originalPrice).slice(0, 6);
  const onlineExperts = experts.filter(e => e.isOnline).slice(0, 5);
  const latestArticles = articles.slice(0, 4);

  return (
    <div className="pb-20">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-green-600 via-green-500 to-emerald-400 mx-4 mt-4 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="leaves" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 0 Q15 5 10 10 Q5 5 10 0" fill="currentColor" />
            </pattern>
            <rect width="100" height="100" fill="url(#leaves)" />
          </svg>
        </div>
        <div className="relative p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-white text-xl font-bold mb-2">Konsultasi Pertanian</h2>
              <p className="text-white/90 text-sm mb-4">Tanya langsung ke ahli pertanian berpengalaman</p>
              <button 
                onClick={onViewAllExperts}
                className="bg-white text-green-600 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-green-50 transition-colors active:scale-95"
              >
                Konsultasi Sekarang
              </button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=200" 
              alt="Expert"
              className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Kategori</h3>
        <div className="grid grid-cols-5 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat.id)}
              className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <div className={`w-12 h-12 ${cat.color} rounded-full flex items-center justify-center text-white mb-2`}>
                {categoryIcons[cat.id]}
              </div>
              <span className="text-xs font-medium text-gray-700">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Flash Sale */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-800">Flash Sale</h3>
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">LIVE</span>
          </div>
          <button 
            onClick={onViewAllProducts}
            className="flex items-center text-green-600 text-sm font-medium hover:text-green-700"
          >
            Lihat Semua
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Online Experts */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-4 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-800">Ahli Online</h3>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <button 
            onClick={onViewAllExperts}
            className="flex items-center text-green-600 text-sm font-medium hover:text-green-700"
          >
            Lihat Semua
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {onlineExperts.map((expert) => (
            <ExpertCard
              key={expert.id}
              expert={expert}
              onConsultClick={onExpertClick}
              variant="compact"
            />
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-4 mt-6">
        <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl overflow-hidden">
          <div className="p-5">
            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">PROMO</span>
            <h3 className="text-white text-lg font-bold mt-2">Diskon 20% Pupuk Organik</h3>
            <p className="text-white/90 text-sm mt-1">Berlaku hingga 28 Februari 2026</p>
            <button 
              onClick={onViewAllProducts}
              className="mt-3 bg-white text-orange-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-orange-50 transition-colors"
            >
              Belanja Sekarang
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full" />
        </div>
      </div>

      {/* Latest Articles */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Artikel Terbaru</h3>
          <button 
            onClick={onViewAllArticles}
            className="flex items-center text-green-600 text-sm font-medium hover:text-green-700"
          >
            Lihat Semua
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {latestArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onArticleClick={onArticleClick}
              variant="featured"
            />
          ))}
        </div>
      </div>

      {/* Popular Products */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Produk Populer</h3>
          <button 
            onClick={onViewAllProducts}
            className="flex items-center text-green-600 text-sm font-medium hover:text-green-700"
          >
            Lihat Semua
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Expert Consultation CTA */}
      <div className="px-4 mt-6 mb-4">
        <div className="bg-gradient-to-br from-green-700 to-green-600 rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {experts.slice(0, 3).map((expert, i) => (
                <img 
                  key={expert.id}
                  src={expert.image} 
                  alt={expert.name}
                  className="w-12 h-12 rounded-full border-2 border-green-600 object-cover"
                  style={{ zIndex: 3 - i }}
                />
              ))}
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">10+ Ahli Siap Membantu</p>
              <p className="text-white/80 text-sm">Konsultasi masalah pertanian Anda</p>
            </div>
          </div>
          <button 
            onClick={onViewAllExperts}
            className="w-full mt-4 bg-white text-green-700 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors active:scale-[0.98]"
          >
            Mulai Konsultasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
