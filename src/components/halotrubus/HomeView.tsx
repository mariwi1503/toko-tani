import React from 'react';
import { 
  ChevronRight, Leaf, Sprout, FlaskConical, Bug, Wrench, 
  Zap, MessageCircle, Star, ArrowRight, ShieldCheck 
} from 'lucide-react';
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
  seeds: <Sprout size={22} />,
  plants: <Leaf size={22} />,
  fertilizers: <FlaskConical size={22} />,
  pesticides: <Bug size={22} />,
  tools: <Wrench size={22} />
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
    <div className="pb-24 bg-gray-50/50 font-sans">
      {/* --- HERO BANNER (SLIM & SCENIC) --- */}
      <div className="relative mx-4 mt-6 overflow-hidden rounded-[2.5rem] bg-emerald-900 shadow-xl shadow-green-900/10">
        {/* Background Image: Scenic Field */}
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&q=80" 
          alt="Agricultural Field"
          className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/80 to-transparent" />
        
        {/* Decoration */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative p-6 px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 py-1">
              <div className="mb-3 flex">
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md border border-white/10">
                  <Sprout size={10} className="text-green-300" />
                  Smart Farming
                </span>
              </div>
              
              <h2 className="text-xl font-black leading-tight text-white mb-2 tracking-tight">
                Solusi Tani <br />Lebih Presisi
              </h2>
              
              <p className="mb-5 text-[11px] font-bold text-green-50/70 leading-relaxed max-w-[180px]">
                Konsultasi langsung di lahan Anda melalui bantuan ahli.
              </p>

              <button 
                onClick={onViewAllExperts}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-green-500 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white transition-all active:scale-95 shadow-lg shadow-green-900/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Mulai Sekarang <ArrowRight size={12} />
                </span>
                <div className="absolute inset-0 translate-x-[-100%] bg-green-400 transition-transform group-hover:translate-x-0" />
              </button>
            </div>

            {/* Visual Plant Detail Circle */}
            <div className="relative hidden xs:block">
              <div className="h-24 w-24 rounded-full border-4 border-white/20 p-1 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=200" 
                  className="h-full w-full rounded-full object-cover shadow-inner"
                  alt="Plant Detail"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-green-600 shadow-lg">
                <Leaf size={14} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CATEGORIES --- */}
      <div className="px-6 mt-10">
        <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase mb-5">Kategori Utama</h3>
        <div className="grid grid-cols-5 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat.id)}
              className="group flex flex-col items-center gap-2 transition-all active:scale-90"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-[1.5rem] shadow-sm transition-all group-hover:shadow-md group-hover:-translate-y-1 ${cat.color} text-white`}>
                {categoryIcons[cat.id]}
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- FLASH SALE --- */}
      <div className="px-6 mt-12">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-black tracking-tight text-gray-900">Flash Sale</h3>
            <div className="flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-[9px] font-black text-white shadow-lg shadow-red-200 uppercase tracking-widest">
              <Zap size={10} className="fill-white" /> Live
            </div>
          </div>
          <button onClick={onViewAllProducts} className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-green-600 hover:text-green-700">
            Semua <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
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

      {/* --- ONLINE EXPERTS --- */}
      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-black tracking-tight text-gray-900">Ahli Online</h3>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
          </div>
          <button onClick={onViewAllExperts} className="text-[11px] font-black uppercase tracking-widest text-green-600">
            Lihat Semua
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 pb-6 no-scrollbar">
          {onlineExperts.map((expert) => (
            <div key={expert.id} className="min-w-[140px] first:pl-0">
              <ExpertCard
                expert={expert}
                onConsultClick={onExpertClick}
                variant="compact"
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- PROMO BANNER --- */}
      <div className="px-6 mt-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-amber-600 p-8 shadow-xl shadow-orange-200">
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10">
            <span className="inline-block rounded-lg bg-black/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
              Spesial Hari Ini
            </span>
            <h3 className="mt-3 text-2xl font-black text-white leading-tight">Diskon 20% <br />Pupuk Organik</h3>
            <button 
              onClick={onViewAllProducts}
              className="mt-6 rounded-2xl bg-white px-6 py-3 text-[11px] font-black uppercase tracking-widest text-orange-600 shadow-lg active:scale-95 transition-all hover:bg-orange-50"
            >
              Belanja Sekarang
            </button>
          </div>
          <div className="absolute right-4 bottom-4 opacity-10 rotate-12">
            <FlaskConical size={140} className="text-white" />
          </div>
        </div>
      </div>

      {/* --- LATEST ARTICLES --- */}
      <div className="px-6 mt-14">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-black tracking-tight text-gray-900">EduTani</h3>
          <button onClick={onViewAllArticles} className="text-[11px] font-black uppercase tracking-widest text-green-600">
            Baca Lagi
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {latestArticles.map((article) => (
            <div key={article.id} className="min-w-[280px]">
              <ArticleCard
                article={article}
                onArticleClick={onArticleClick}
                variant="featured"
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- BOTTOM CTA --- */}
      <div className="px-6 mt-10 mb-8">
        <div className="rounded-[3rem] bg-slate-900 p-8 text-center shadow-2xl shadow-slate-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-emerald-600" />
          <div className="relative z-10">
            <div className="mb-6 flex justify-center -space-x-4">
              {experts.slice(0, 4).map((expert, i) => (
                <img 
                  key={expert.id}
                  src={expert.image} 
                  className="h-14 w-14 rounded-2xl border-4 border-green-600 object-cover shadow-lg"
                  style={{ zIndex: 4 - i }}
                  alt=""
                />
              ))}
            </div>
            <h4 className="text-xl font-black text-white mb-2 tracking-tight">Butuh Solusi Cepat?</h4>
            <p className="text-sm font-medium text-green-50/80 mb-8 max-w-[240px] mx-auto">Tanya apa saja seputar pertanian kepada tim ahli kami.</p>
            <button 
              onClick={onViewAllExperts}
              className="flex w-full items-center justify-center gap-3 rounded-[1.8rem] bg-white py-5 text-xs font-black uppercase tracking-[0.2em] text-green-600 shadow-xl transition-all active:scale-95 hover:bg-green-50"
            >
              <MessageCircle size={18} fill="currentColor" /> Hubungi Ahli
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;