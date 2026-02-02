import React, { useState, useMemo } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
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

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const trendingArticles = [...articles].sort((a, b) => b.likes - a.likes).slice(0, 3);
  const featuredArticle = articles[0];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-500 px-4 pt-4 pb-6">
        <h1 className="text-white text-xl font-bold mb-1">Artikel Pertanian</h1>
        <p className="text-white/80 text-sm mb-4">Tips dan panduan dari para ahli</p>
        
        {/* Search */}
        <div className="flex items-center gap-3 bg-white rounded-full px-4 py-3">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Cari artikel..."
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

      {/* Category Filter */}
      <div className="px-4 py-3 overflow-x-auto border-b border-gray-100">
        <div className="flex gap-2">
          {articleCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Article (only show when no search/filter) */}
      {!searchQuery && selectedCategory === 'Semua' && (
        <div className="px-4 pt-4">
          <div 
            onClick={() => onArticleClick(featuredArticle)}
            className="relative rounded-2xl overflow-hidden cursor-pointer"
          >
            <img 
              src={featuredArticle.image} 
              alt={featuredArticle.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {featuredArticle.category}
              </span>
              <h2 className="text-white text-lg font-bold mt-2 line-clamp-2">
                {featuredArticle.title}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <img 
                  src={featuredArticle.author.image} 
                  alt={featuredArticle.author.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-white/80 text-sm">{featuredArticle.author.name}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trending Section (only show when no search/filter) */}
      {!searchQuery && selectedCategory === 'Semua' && (
        <div className="px-4 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={20} className="text-red-500" />
            <h3 className="font-bold text-gray-800">Trending</h3>
          </div>
          <div className="space-y-3">
            {trendingArticles.map((article, index) => (
              <div 
                key={article.id}
                onClick={() => onArticleClick(article)}
                className="flex gap-3 cursor-pointer hover:bg-gray-50 rounded-xl p-2 -mx-2 transition-colors"
              >
                <span className="text-2xl font-bold text-gray-200 w-8">{index + 1}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 line-clamp-2">{article.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{article.author.name}</p>
                </div>
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Articles */}
      <div className="px-4 mt-6">
        {(searchQuery || selectedCategory !== 'Semua') && (
          <p className="text-sm text-gray-500 mb-4">
            Menampilkan {filteredArticles.length} artikel
          </p>
        )}
        
        {!searchQuery && selectedCategory === 'Semua' && (
          <h3 className="font-bold text-gray-800 mb-4">Artikel Terbaru</h3>
        )}

        {filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Search size={64} className="text-gray-300 mb-4" />
            <p className="text-gray-500 text-center">Artikel tidak ditemukan</p>
            <p className="text-gray-400 text-sm text-center mt-1">Coba kata kunci lain</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onArticleClick={onArticleClick}
                variant="compact"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesView;
