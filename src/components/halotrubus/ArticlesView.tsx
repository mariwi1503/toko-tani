import React, { useState, useMemo } from 'react';
import { Search, X, TrendingUp, Sparkles, Filter, ChevronRight, BookOpen } from 'lucide-react';
import { articles, articleCategories, Article } from '@/data/dummyData';
import ArticleCard from './ArticleCard';

interface ArticlesViewProps {
  onArticleClick: (article: Article) => void;
}

const ArticlesView: React.FC<ArticlesViewProps> = ({ onArticleClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredArticles = useMemo(() => {
    let filtered = [...articles];
    if (searchQuery) {
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }
    return filtered;
  }, [searchQuery, selectedCategory]);

  const trendingArticles = [...articles].sort((a, b) => b.likes - a.likes).slice(0, 3);
  const featuredArticle = articles[0];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-28 font-sans animate-in fade-in duration-500">
      
      {/* --- 1. HEADER & SEARCH --- */}
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-[3rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-full -mr-20 -mt-20 z-0" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Wawasan Tani</h1>
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <BookOpen size={20} />
            </div>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Tips & Panduan Pakar Pertanian
          </p>
          
          {/* Modern Search Bar */}
          <div className="flex items-center gap-4 bg-gray-100 rounded-[1.5rem] px-5 py-4 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500/20">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Cari ilmu pertanian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 outline-none text-sm font-bold text-gray-700 placeholder-gray-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-1 hover:bg-gray-200 rounded-lg">
                <X size={16} className="text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- 2. CATEGORY PILLS --- */}
      <div className="px-6 mt-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-3">
          {articleCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm ${
                selectedCategory === cat
                  ? 'bg-green-500 text-white shadow-green-100'
                  : 'bg-white text-gray-400 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- 3. FEATURED CONTENT (Hidden on Search) --- */}
      {!searchQuery && selectedCategory === 'Semua' && (
        <div className="px-6 mt-8">
          <div className="flex items-center gap-2 mb-5 ml-1">
            <Sparkles size={16} className="text-amber-500 fill-amber-500" />
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Rekomendasi Utama</h3>
          </div>
          
          <div 
            onClick={() => onArticleClick(featuredArticle)}
            className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl shadow-gray-200"
          >
            <img 
              src={featuredArticle.image} 
              alt={featuredArticle.title}
              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="bg-white/20 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-white/20">
                {featuredArticle.category}
              </span>
              <h2 className="text-white text-2xl font-black mt-4 leading-tight">
                {featuredArticle.title}
              </h2>
              <div className="flex items-center gap-3 mt-5">
                <img 
                  src={featuredArticle.author.image} 
                  alt={featuredArticle.author.name}
                  className="w-8 h-8 rounded-xl object-cover border-2 border-white/20"
                />
                <span className="text-white/80 text-[10px] font-black uppercase tracking-widest">
                  {featuredArticle.author.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 4. TRENDING SECTION --- */}
      {!searchQuery && selectedCategory === 'Semua' && (
        <div className="px-6 mt-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 ml-1">
              <TrendingUp size={16} className="text-red-500" />
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Sedang Populer</h3>
            </div>
          </div>
          
          <div className="bg-white rounded-[2.2rem] p-6 shadow-sm border border-gray-100 space-y-6">
            {trendingArticles.map((article, index) => (
              <div 
                key={article.id}
                onClick={() => onArticleClick(article)}
                className="flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-all"
              >
                <span className="text-2xl font-black text-gray-100">{index + 1}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-gray-800 text-sm line-clamp-2 leading-snug">{article.title}</h4>
                  <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">{article.author.name}</p>
                </div>
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- 5. MAIN FEED --- */}
      <div className="px-6 mt-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
            {searchQuery || selectedCategory !== 'Semua' 
              ? `Hasil: ${filteredArticles.length} Artikel` 
              : 'Artikel Terbaru'}
          </h3>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center shadow-sm border border-gray-50">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-200">
              <Search size={40} />
            </div>
            <p className="font-black text-gray-800 uppercase text-xs tracking-widest">Tidak Ditemukan</p>
            <p className="text-gray-400 text-[10px] font-bold mt-2 leading-relaxed">Coba gunakan kata kunci lain<br/>atau kategori berbeda.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <div key={article.id} className="animate-in slide-in-from-bottom-4 duration-500">
                <ArticleCard
                  article={article}
                  onArticleClick={onArticleClick}
                  variant="compact"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center pt-10 pb-8 opacity-20">
        <p className="text-[9px] font-black uppercase tracking-[0.5em]">Halo Trubus Library 2026</p>
      </div>
    </div>
  );
};

export default ArticlesView;