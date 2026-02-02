import React, { useState } from 'react';
import { X, Heart, Share2, Bookmark, Clock, Calendar, ChevronLeft } from 'lucide-react';
import { Article } from '@/data/dummyData';

interface ArticleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
}

const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  isOpen,
  onClose,
  article
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(article?.likes || 0);

  if (!isOpen || !article) return null;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b border-gray-100">
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <div className="flex gap-2">
          <button 
            onClick={handleLike}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Heart size={24} className={isLiked ? 'text-red-500 fill-red-500' : 'text-gray-700'} />
          </button>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bookmark size={24} className={isSaved ? 'text-green-500 fill-green-500' : 'text-gray-700'} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 size={24} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero Image */}
        <div className="relative h-56">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
              {article.category}
            </span>
          </div>
        </div>

        <div className="p-4">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{article.title}</h1>

          {/* Author */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <img 
              src={article.author.image} 
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{article.author.name}</p>
              <p className="text-sm text-green-600">{article.author.specialization}</p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{article.publishedAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{article.readTime} menit baca</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={16} className={isLiked ? 'text-red-500 fill-red-500' : ''} />
              <span>{likes}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-green max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">{article.excerpt}</p>
            
            <h2 className="text-lg font-bold text-gray-800 mt-6 mb-3">Pendahuluan</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {article.content} Pertanian modern membutuhkan pengetahuan yang komprehensif untuk mencapai hasil yang optimal. 
              Dalam artikel ini, kita akan membahas berbagai aspek penting yang perlu diperhatikan.
            </p>

            <h2 className="text-lg font-bold text-gray-800 mt-6 mb-3">Langkah-langkah Penting</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Pertama, pastikan Anda memilih bahan berkualitas tinggi. Kedua, perhatikan kondisi lingkungan seperti suhu, 
              kelembaban, dan pencahayaan. Ketiga, lakukan perawatan rutin sesuai jadwal yang telah ditentukan.
            </p>

            <h2 className="text-lg font-bold text-gray-800 mt-6 mb-3">Tips dan Trik</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Selalu gunakan peralatan yang bersih dan steril</li>
              <li>Perhatikan tanda-tanda awal masalah pada tanaman</li>
              <li>Konsultasikan dengan ahli jika mengalami kesulitan</li>
              <li>Dokumentasikan perkembangan untuk evaluasi</li>
              <li>Bergabung dengan komunitas untuk berbagi pengalaman</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-800 mt-6 mb-3">Kesimpulan</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Dengan menerapkan panduan di atas secara konsisten, Anda dapat mencapai hasil yang memuaskan. 
              Jangan ragu untuk berkonsultasi dengan ahli pertanian kami di Halo Trubus jika membutuhkan bantuan lebih lanjut.
            </p>
          </div>

          {/* Author Card */}
          <div className="bg-green-50 rounded-xl p-4 mt-6">
            <p className="text-sm text-gray-600 mb-3">Ditulis oleh</p>
            <div className="flex items-center gap-3">
              <img 
                src={article.author.image} 
                alt={article.author.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{article.author.name}</p>
                <p className="text-sm text-green-600">{article.author.specialization}</p>
                <p className="text-xs text-gray-500 mt-1">{article.author.experience} tahun pengalaman</p>
              </div>
              <button className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-full hover:bg-green-600 transition-colors">
                Konsultasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailModal;
