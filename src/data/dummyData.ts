// Types
export interface Product {
  id: string;
  name: string;
  category: 'seeds' | 'plants' | 'fertilizers' | 'pesticides' | 'tools';
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  sold: number;
  description: string;
  stock: number;
}

export interface Expert {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  consultations: number;
  price: number;
  image: string;
  isOnline: boolean;
  bio: string;
  education: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: Expert;
  image: string;
  readTime: number;
  publishedAt: string;
  likes: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Consultation {
  id: string;
  expert: Expert;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'consumer' | 'expert';
  avatar: string;
}

// Dummy Data
export const products: Product[] = [
  {
    id: '1',
    name: 'Benih Cabai Rawit Super',
    category: 'seeds',
    price: 25000,
    originalPrice: 35000,
    image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400',
    rating: 4.8,
    sold: 1250,
    description: 'Benih cabai rawit unggul dengan tingkat keberhasilan tumbuh 95%. Cocok untuk dataran rendah dan menengah.',
    stock: 500
  },
  {
    id: '2',
    name: 'Bibit Tomat Cherry',
    category: 'seeds',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400',
    rating: 4.7,
    sold: 890,
    description: 'Bibit tomat cherry berkualitas tinggi, buah lebat dan manis.',
    stock: 350
  },
  {
    id: '3',
    name: 'Tanaman Monstera Deliciosa',
    category: 'plants',
    price: 150000,
    originalPrice: 200000,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
    rating: 4.9,
    sold: 456,
    description: 'Tanaman hias monstera dengan daun berlubang yang cantik. Tinggi 40-50cm.',
    stock: 45
  },
  {
    id: '4',
    name: 'Pupuk NPK Mutiara 16-16-16',
    category: 'fertilizers',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    rating: 4.6,
    sold: 2340,
    description: 'Pupuk majemuk lengkap untuk semua jenis tanaman. Kemasan 5kg.',
    stock: 200
  },
  {
    id: '5',
    name: 'Pestisida Organik Neem Oil',
    category: 'pesticides',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400',
    rating: 4.5,
    sold: 1567,
    description: 'Pestisida alami dari minyak mimba, aman untuk tanaman dan lingkungan.',
    stock: 300
  },
  {
    id: '6',
    name: 'Cangkul Stainless Steel',
    category: 'tools',
    price: 125000,
    originalPrice: 150000,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    rating: 4.8,
    sold: 678,
    description: 'Cangkul berkualitas tinggi dengan gagang kayu jati.',
    stock: 150
  },
  {
    id: '7',
    name: 'Benih Kangkung Cabutan',
    category: 'seeds',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=400',
    rating: 4.7,
    sold: 3450,
    description: 'Benih kangkung cepat panen, siap panen dalam 25-30 hari.',
    stock: 800
  },
  {
    id: '8',
    name: 'Tanaman Lidah Buaya',
    category: 'plants',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400',
    rating: 4.6,
    sold: 1234,
    description: 'Tanaman lidah buaya segar, banyak manfaat untuk kesehatan dan kecantikan.',
    stock: 200
  },
  {
    id: '9',
    name: 'Pupuk Organik Kompos',
    category: 'fertilizers',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
    rating: 4.8,
    sold: 1890,
    description: 'Pupuk kompos organik 100% alami. Kemasan 10kg.',
    stock: 250
  },
  {
    id: '10',
    name: 'Fungisida Sistemik',
    category: 'pesticides',
    price: 68000,
    image: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400',
    rating: 4.4,
    sold: 987,
    description: 'Fungisida untuk mengatasi jamur pada tanaman.',
    stock: 180
  },
  {
    id: '11',
    name: 'Sprayer Elektrik 5L',
    category: 'tools',
    price: 285000,
    originalPrice: 350000,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    rating: 4.7,
    sold: 456,
    description: 'Sprayer elektrik dengan kapasitas 5 liter, hemat tenaga.',
    stock: 75
  },
  {
    id: '12',
    name: 'Benih Bayam Hijau',
    category: 'seeds',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
    rating: 4.6,
    sold: 4567,
    description: 'Benih bayam hijau berkualitas, cepat tumbuh dan subur.',
    stock: 900
  },
  {
    id: '13',
    name: 'Tanaman Sirih Gading',
    category: 'plants',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400',
    rating: 4.5,
    sold: 2345,
    description: 'Tanaman hias gantung yang mudah perawatan.',
    stock: 300
  },
  {
    id: '14',
    name: 'Pupuk Cair Growmore',
    category: 'fertilizers',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    rating: 4.7,
    sold: 1678,
    description: 'Pupuk cair lengkap untuk pertumbuhan optimal.',
    stock: 220
  },
  {
    id: '15',
    name: 'Insektisida Alami',
    category: 'pesticides',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400',
    rating: 4.3,
    sold: 876,
    description: 'Insektisida berbahan alami untuk membasmi hama.',
    stock: 400
  },
  {
    id: '16',
    name: 'Pot Tanaman Keramik',
    category: 'tools',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
    rating: 4.8,
    sold: 789,
    description: 'Pot keramik elegan dengan lubang drainase.',
    stock: 120
  },
  {
    id: '17',
    name: 'Benih Selada Keriting',
    category: 'seeds',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=400',
    rating: 4.6,
    sold: 2134,
    description: 'Benih selada keriting hidroponik dan konvensional.',
    stock: 600
  },
  {
    id: '18',
    name: 'Tanaman Kaktus Mini Set',
    category: 'plants',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400',
    rating: 4.9,
    sold: 1567,
    description: 'Set 3 kaktus mini dalam pot lucu.',
    stock: 180
  },
  {
    id: '19',
    name: 'Pupuk Kandang Fermentasi',
    category: 'fertilizers',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
    rating: 4.5,
    sold: 2890,
    description: 'Pupuk kandang yang sudah difermentasi, tidak berbau.',
    stock: 350
  },
  {
    id: '20',
    name: 'Sarung Tangan Kebun',
    category: 'tools',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    rating: 4.4,
    sold: 3456,
    description: 'Sarung tangan berkebun anti slip dan tahan air.',
    stock: 500
  },
  {
    id: '21',
    name: 'Benih Pakcoy',
    category: 'seeds',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=400',
    rating: 4.7,
    sold: 3210,
    description: 'Benih pakcoy hijau segar, cocok untuk hidroponik.',
    stock: 700
  },
  {
    id: '22',
    name: 'Tanaman Philodendron',
    category: 'plants',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400',
    rating: 4.8,
    sold: 678,
    description: 'Philodendron dengan daun hijau mengkilap.',
    stock: 90
  },
  {
    id: '23',
    name: 'Herbisida Selektif',
    category: 'pesticides',
    price: 52000,
    image: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400',
    rating: 4.2,
    sold: 654,
    description: 'Herbisida untuk membasmi gulma tanpa merusak tanaman.',
    stock: 160
  },
  {
    id: '24',
    name: 'Sekop Mini Set',
    category: 'tools',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    rating: 4.6,
    sold: 1234,
    description: 'Set 3 sekop mini untuk berkebun di pot.',
    stock: 200
  }
];

export const experts: Expert[] = [
  {
    id: '1',
    name: 'Dr. Bambang Supriyadi',
    specialization: 'Tanaman Pangan',
    experience: 15,
    rating: 4.9,
    consultations: 2456,
    price: 75000,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    isOnline: true,
    bio: 'Ahli pertanian dengan fokus pada tanaman pangan dan hortikultura. Lulusan IPB dengan pengalaman 15 tahun.',
    education: 'S3 Agronomi - IPB University'
  },
  {
    id: '2',
    name: 'Ir. Siti Rahayu, M.Sc',
    specialization: 'Hidroponik',
    experience: 12,
    rating: 4.8,
    consultations: 1890,
    price: 65000,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
    isOnline: true,
    bio: 'Spesialis sistem hidroponik dan aquaponik untuk pertanian urban.',
    education: 'S2 Hortikultura - Universitas Brawijaya'
  },
  {
    id: '3',
    name: 'Prof. Ahmad Fauzi',
    specialization: 'Hama & Penyakit',
    experience: 20,
    rating: 4.9,
    consultations: 3567,
    price: 100000,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400',
    isOnline: false,
    bio: 'Profesor di bidang proteksi tanaman dengan keahlian pengendalian hama terpadu.',
    education: 'S3 Proteksi Tanaman - UGM'
  },
  {
    id: '4',
    name: 'Dr. Maya Kusuma',
    specialization: 'Tanaman Hias',
    experience: 10,
    rating: 4.7,
    consultations: 1234,
    price: 60000,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    isOnline: true,
    bio: 'Ahli tanaman hias dan landscape dengan pengalaman desain taman.',
    education: 'S3 Arsitektur Lanskap - IPB University'
  },
  {
    id: '5',
    name: 'Ir. Dedi Kurniawan',
    specialization: 'Perkebunan',
    experience: 18,
    rating: 4.8,
    consultations: 2890,
    price: 80000,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
    isOnline: true,
    bio: 'Konsultan perkebunan dengan keahlian di kelapa sawit dan karet.',
    education: 'S2 Agribisnis - Universitas Padjadjaran'
  },
  {
    id: '6',
    name: 'Dr. Ratna Dewi',
    specialization: 'Pertanian Organik',
    experience: 14,
    rating: 4.9,
    consultations: 2100,
    price: 70000,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    isOnline: false,
    bio: 'Praktisi pertanian organik dan sertifikasi organik nasional.',
    education: 'S3 Ilmu Tanah - IPB University'
  },
  {
    id: '7',
    name: 'Ir. Hendra Wijaya, M.P',
    specialization: 'Irigasi & Pengairan',
    experience: 16,
    rating: 4.6,
    consultations: 1567,
    price: 65000,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400',
    isOnline: true,
    bio: 'Ahli sistem irigasi dan manajemen air untuk pertanian.',
    education: 'S2 Teknik Pertanian - UGM'
  },
  {
    id: '8',
    name: 'Dr. Linda Permata',
    specialization: 'Bioteknologi Pertanian',
    experience: 11,
    rating: 4.8,
    consultations: 987,
    price: 85000,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400',
    isOnline: true,
    bio: 'Peneliti bioteknologi tanaman dengan fokus pada pemuliaan varietas unggul.',
    education: 'S3 Bioteknologi - ITB'
  },
  {
    id: '9',
    name: 'Prof. Agus Santoso',
    specialization: 'Agribisnis',
    experience: 22,
    rating: 4.9,
    consultations: 4123,
    price: 120000,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    isOnline: false,
    bio: 'Pakar agribisnis dan pengembangan usaha pertanian skala kecil hingga besar.',
    education: 'S3 Ekonomi Pertanian - IPB University'
  },
  {
    id: '10',
    name: 'Ir. Fitri Handayani',
    specialization: 'Sayuran & Buah',
    experience: 13,
    rating: 4.7,
    consultations: 1789,
    price: 60000,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    isOnline: true,
    bio: 'Spesialis budidaya sayuran dan buah-buahan tropis.',
    education: 'S2 Hortikultura - Universitas Brawijaya'
  }
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'Panduan Lengkap Menanam Cabai di Pot untuk Pemula',
    excerpt: 'Pelajari cara menanam cabai di pot dengan mudah, mulai dari pemilihan bibit hingga panen yang melimpah.',
    content: 'Menanam cabai di pot adalah solusi tepat bagi Anda yang memiliki lahan terbatas...',
    category: 'Budidaya',
    author: experts[0],
    image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=800',
    readTime: 8,
    publishedAt: '2026-01-28',
    likes: 1234
  },
  {
    id: '2',
    title: 'Mengenal Sistem Hidroponik NFT untuk Sayuran',
    excerpt: 'Sistem NFT adalah metode hidroponik populer yang efisien untuk menanam sayuran daun.',
    content: 'Nutrient Film Technique (NFT) adalah sistem hidroponik yang mengalirkan larutan nutrisi...',
    category: 'Hidroponik',
    author: experts[1],
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
    readTime: 12,
    publishedAt: '2026-01-25',
    likes: 987
  },
  {
    id: '3',
    title: 'Cara Mengatasi Hama Kutu Daun pada Tanaman',
    excerpt: 'Kutu daun adalah hama umum yang dapat merusak tanaman. Berikut cara mengatasinya secara alami.',
    content: 'Kutu daun atau aphid adalah salah satu hama yang paling sering menyerang tanaman...',
    category: 'Hama & Penyakit',
    author: experts[2],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
    readTime: 6,
    publishedAt: '2026-01-22',
    likes: 2345
  },
  {
    id: '4',
    title: 'Tips Merawat Monstera agar Daun Berlubang Sempurna',
    excerpt: 'Monstera deliciosa dikenal dengan daun berlubangnya yang unik. Simak tips perawatannya.',
    content: 'Monstera deliciosa adalah tanaman hias tropis yang sangat populer...',
    category: 'Tanaman Hias',
    author: experts[3],
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800',
    readTime: 7,
    publishedAt: '2026-01-20',
    likes: 1567
  },
  {
    id: '5',
    title: 'Panduan Pemupukan Kelapa Sawit yang Benar',
    excerpt: 'Pemupukan yang tepat adalah kunci produktivitas kebun kelapa sawit Anda.',
    content: 'Kelapa sawit membutuhkan nutrisi yang cukup untuk menghasilkan buah yang optimal...',
    category: 'Perkebunan',
    author: experts[4],
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
    readTime: 15,
    publishedAt: '2026-01-18',
    likes: 876
  },
  {
    id: '6',
    title: 'Membuat Kompos dari Sampah Dapur',
    excerpt: 'Ubah sampah dapur menjadi kompos berkualitas untuk kebun Anda dengan cara mudah ini.',
    content: 'Kompos adalah pupuk organik yang sangat baik untuk tanaman...',
    category: 'Pertanian Organik',
    author: experts[5],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
    readTime: 10,
    publishedAt: '2026-01-15',
    likes: 2100
  },
  {
    id: '7',
    title: 'Sistem Irigasi Tetes untuk Lahan Kering',
    excerpt: 'Irigasi tetes adalah solusi hemat air untuk pertanian di daerah dengan curah hujan rendah.',
    content: 'Irigasi tetes atau drip irrigation adalah metode pengairan yang efisien...',
    category: 'Irigasi',
    author: experts[6],
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
    readTime: 11,
    publishedAt: '2026-01-12',
    likes: 654
  },
  {
    id: '8',
    title: 'Mengenal Varietas Padi Unggul Terbaru',
    excerpt: 'Varietas padi unggul hasil pemuliaan terbaru dengan produktivitas tinggi dan tahan hama.',
    content: 'Pemuliaan tanaman terus menghasilkan varietas padi baru yang lebih unggul...',
    category: 'Bioteknologi',
    author: experts[7],
    image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=800',
    readTime: 9,
    publishedAt: '2026-01-10',
    likes: 543
  },
  {
    id: '9',
    title: 'Strategi Pemasaran Hasil Pertanian Online',
    excerpt: 'Pelajari cara memasarkan hasil pertanian Anda secara online untuk jangkauan lebih luas.',
    content: 'Era digital membuka peluang besar bagi petani untuk memasarkan produknya...',
    category: 'Agribisnis',
    author: experts[8],
    image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=800',
    readTime: 13,
    publishedAt: '2026-01-08',
    likes: 1890
  },
  {
    id: '10',
    title: 'Budidaya Stroberi di Dataran Rendah',
    excerpt: 'Stroberi bisa ditanam di dataran rendah dengan teknik yang tepat. Simak panduannya.',
    content: 'Meskipun stroberi identik dengan dataran tinggi, tanaman ini bisa dibudidayakan...',
    category: 'Budidaya',
    author: experts[9],
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
    readTime: 8,
    publishedAt: '2026-01-05',
    likes: 1234
  },
  {
    id: '11',
    title: 'Cara Membuat Pestisida Alami dari Bawang Putih',
    excerpt: 'Bawang putih bisa dijadikan pestisida alami yang efektif untuk mengusir hama.',
    content: 'Pestisida alami dari bawang putih adalah alternatif ramah lingkungan...',
    category: 'Pertanian Organik',
    author: experts[5],
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
    readTime: 5,
    publishedAt: '2026-01-03',
    likes: 2567
  },
  {
    id: '12',
    title: 'Teknik Grafting untuk Tanaman Buah',
    excerpt: 'Grafting atau okulasi adalah teknik perbanyakan tanaman buah yang efektif.',
    content: 'Grafting adalah teknik menggabungkan dua tanaman menjadi satu...',
    category: 'Budidaya',
    author: experts[0],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
    readTime: 14,
    publishedAt: '2026-01-01',
    likes: 876
  },
  {
    id: '13',
    title: 'Mengenal Jenis-jenis Media Tanam Hidroponik',
    excerpt: 'Pemilihan media tanam yang tepat sangat penting untuk keberhasilan hidroponik.',
    content: 'Media tanam hidroponik berfungsi sebagai penopang akar tanaman...',
    category: 'Hidroponik',
    author: experts[1],
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
    readTime: 10,
    publishedAt: '2025-12-28',
    likes: 1456
  },
  {
    id: '14',
    title: 'Penyakit Layu Fusarium dan Cara Mengatasinya',
    excerpt: 'Layu fusarium adalah penyakit serius yang menyerang berbagai tanaman. Kenali gejalanya.',
    content: 'Fusarium oxysporum adalah jamur patogen yang menyebabkan penyakit layu...',
    category: 'Hama & Penyakit',
    author: experts[2],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
    readTime: 9,
    publishedAt: '2025-12-25',
    likes: 987
  },
  {
    id: '15',
    title: 'Tren Tanaman Hias 2026 yang Wajib Dimiliki',
    excerpt: 'Simak daftar tanaman hias yang sedang tren dan diprediksi populer di tahun 2026.',
    content: 'Dunia tanaman hias terus berkembang dengan tren baru setiap tahunnya...',
    category: 'Tanaman Hias',
    author: experts[3],
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800',
    readTime: 7,
    publishedAt: '2025-12-22',
    likes: 3456
  }
];

export const categories = [
  { id: 'seeds', name: 'Benih', icon: 'seed', color: 'bg-green-500' },
  { id: 'plants', name: 'Tanaman', icon: 'plant', color: 'bg-emerald-500' },
  { id: 'fertilizers', name: 'Pupuk', icon: 'fertilizer', color: 'bg-amber-500' },
  { id: 'pesticides', name: 'Pestisida', icon: 'pesticide', color: 'bg-red-500' },
  { id: 'tools', name: 'Alat', icon: 'tool', color: 'bg-blue-500' }
];

export const articleCategories = [
  'Semua',
  'Budidaya',
  'Hidroponik',
  'Hama & Penyakit',
  'Tanaman Hias',
  'Perkebunan',
  'Pertanian Organik',
  'Irigasi',
  'Bioteknologi',
  'Agribisnis'
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};
