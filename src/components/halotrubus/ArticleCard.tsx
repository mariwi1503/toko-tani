import React from 'react';
import { Clock, Heart, User } from 'lucide-react';
import { Article } from '@/data/dummyData';

interface ArticleCardProps {
  article: Article;
  onArticleClick: (article: Article) => void;
  variant?: 'default' | 'featured' | 'compact';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onArticleClick, variant = 'default' }) => {
  if (variant === 'featured') {
    return (
      <div 
        onClick={() => onArticleClick(article)}
        className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all min-w-[280px]"
      >
        <div className="relative h-40">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            {article.category}
          </span>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-semibold line-clamp-2">{article.title}</h3>
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={article.author.image} 
                alt={article.author.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs text-gray-600 line-clamp-1">{article.author.name}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock size={12} />
              <span className="text-xs">{article.readTime} menit</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        onClick={() => onArticleClick(article)}
        className="flex gap-3 bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-all"
      >
        <img 
          src={article.image} 
          alt={article.title}
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <span className="text-xs text-green-600 font-medium">{article.category}</span>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mt-1">{article.title}</h3>
          <div className="flex items-center gap-2 mt-2 text-gray-500">
            <Clock size={12} />
            <span className="text-xs">{article.readTime} menit</span>
            <Heart size={12} />
            <span className="text-xs">{article.likes}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onArticleClick(article)}
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
    >
      <img 
        src={article.image} 
        alt={article.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
          {article.category}
        </span>
        <h3 className="text-base font-semibold text-gray-800 mt-2 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <img 
              src={article.author.image} 
              alt={article.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-xs font-medium text-gray-700 line-clamp-1">{article.author.name}</p>
              <p className="text-xs text-gray-500">{article.publishedAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span className="text-xs">{article.readTime}m</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={14} />
              <span className="text-xs">{article.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
