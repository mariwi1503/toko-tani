import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (data: RegisterData) => void;
  onForgotPassword: (email: string) => void;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'consumer' | 'expert';
}

type AuthView = 'login' | 'register' | 'forgot' | 'verify' | 'reset-sent';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  onForgotPassword
}) => {
  const [view, setView] = useState<AuthView>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Login form state
  const [loginEmail, setLoginEmail] = useState('email@ku.com');
  const [loginPassword, setLoginPassword] = useState('12345');

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerRole, setRegisterRole] = useState<'consumer' | 'expert'>('consumer');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');

  if (!isOpen) return null;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validateLoginForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!loginEmail) {
      newErrors.email = 'Email wajib diisi';
    } else if (!validateEmail(loginEmail)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!loginPassword) {
      newErrors.password = 'Password wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!registerName || registerName.trim().length < 3) {
      newErrors.name = 'Nama minimal 3 karakter';
    }

    if (!registerEmail) {
      newErrors.email = 'Email wajib diisi';
    } else if (!validateEmail(registerEmail)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!registerPhone) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    } else if (!validatePhone(registerPhone)) {
      newErrors.phone = 'Format nomor telepon tidak valid (contoh: 08123456789)';
    }

    if (!registerPassword) {
      newErrors.password = 'Password wajib diisi';
    } else if (!validatePassword(registerPassword)) {
      newErrors.password = 'Password minimal 8 karakter';
    }

    if (registerPassword !== registerConfirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password tidak cocok';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onLogin(loginEmail, loginPassword);
    setIsLoading(false);
    resetForms();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;
    if (!agreeTerms) {
      alert('Anda harus menyetujui syarat dan ketentuan');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onRegister({
      name: registerName,
      email: registerEmail,
      phone: registerPhone,
      password: registerPassword,
      role: registerRole
    });
    setIsLoading(false);
    setView('verify');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !validateEmail(forgotEmail)) {
      setErrors({ email: 'Masukkan email yang valid' });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onForgotPassword(forgotEmail);
    setIsLoading(false);
    setView('reset-sent');
  };

  const resetForms = () => {
    // setLoginEmail('');
    // setLoginPassword('');
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPhone('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
    setRegisterRole('consumer');
    setAgreeTerms(false);
    setForgotEmail('');
    setErrors({});
  };

  const handleClose = () => {
    resetForms();
    setView('login');
    onClose();
  };

  const renderLogin = () => (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="text-center mb-6">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/6980194cc3fba0d6df17a964_1770002796949_b36564b6.png" 
          alt="Halo Trubus" 
          className="h-12 mx-auto mb-4"
        />
        <h2 className="text-xl font-bold text-gray-800">Selamat Datang!</h2>
        <p className="text-gray-500 text-sm">Masuk ke akun Halo Trubus Anda</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={loginEmail}
            // onChange={(e) => setLoginEmail(e.target.value)}
            placeholder="nama@email.com"
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            }`}
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={loginPassword}
            // onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="Masukkan password"
            className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.password ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setView('forgot')}
          className="text-sm text-green-600 hover:text-green-700"
        >
          Lupa Password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Memproses...' : 'Masuk'}
      </button>

      <p className="text-center text-sm text-gray-500">
        Belum punya akun?{' '}
        <button
          type="button"
          onClick={() => { setView('register'); setErrors({}); }}
          className="text-green-600 font-medium hover:text-green-700"
        >
          Daftar Sekarang
        </button>
      </p>
    </form>
  );

  const renderRegister = () => (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Buat Akun Baru</h2>
        <p className="text-gray-500 text-sm">Daftar untuk mulai menggunakan Halo Trubus</p>
      </div>

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Daftar Sebagai</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRegisterRole('consumer')}
            className={`p-3 rounded-xl border-2 transition-all ${
              registerRole === 'consumer'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <User size={24} className={`mx-auto mb-1 ${registerRole === 'consumer' ? 'text-green-600' : 'text-gray-400'}`} />
            <p className={`text-sm font-medium ${registerRole === 'consumer' ? 'text-green-600' : 'text-gray-600'}`}>Konsumen</p>
            <p className="text-xs text-gray-400">Beli produk & konsultasi</p>
          </button>
          <button
            type="button"
            onClick={() => setRegisterRole('expert')}
            className={`p-3 rounded-xl border-2 transition-all ${
              registerRole === 'expert'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CheckCircle size={24} className={`mx-auto mb-1 ${registerRole === 'expert' ? 'text-green-600' : 'text-gray-400'}`} />
            <p className={`text-sm font-medium ${registerRole === 'expert' ? 'text-green-600' : 'text-gray-600'}`}>Ahli</p>
            <p className="text-xs text-gray-400">Layani konsultasi & tulis artikel</p>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
        <div className="relative">
          <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            placeholder="Masukkan nama lengkap"
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.name ? 'border-red-500' : 'border-gray-200'
            }`}
          />
        </div>
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            placeholder="nama@email.com"
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            }`}
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
        <div className="relative">
          <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="tel"
            value={registerPhone}
            onChange={(e) => setRegisterPhone(e.target.value)}
            placeholder="08123456789"
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-200'
            }`}
          />
        </div>
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.password ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
        <div className="relative">
          <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={registerConfirmPassword}
            onChange={(e) => setRegisterConfirmPassword(e.target.value)}
            placeholder="Ulangi password"
            className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
          className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          Saya menyetujui{' '}
          <button type="button" className="text-green-600 hover:underline">Syarat & Ketentuan</button>
          {' '}dan{' '}
          <button type="button" className="text-green-600 hover:underline">Kebijakan Privasi</button>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading || !agreeTerms}
        className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Memproses...' : 'Daftar'}
      </button>

      <p className="text-center text-sm text-gray-500">
        Sudah punya akun?{' '}
        <button
          type="button"
          onClick={() => { setView('login'); setErrors({}); }}
          className="text-green-600 font-medium hover:text-green-700"
        >
          Masuk
        </button>
      </p>
    </form>
  );

  const renderForgotPassword = () => (
    <form onSubmit={handleForgotPassword} className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock size={32} className="text-amber-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Lupa Password?</h2>
        <p className="text-gray-500 text-sm">Masukkan email Anda untuk reset password</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            placeholder="nama@email.com"
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            }`}
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Mengirim...' : 'Kirim Link Reset'}
      </button>

      <button
        type="button"
        onClick={() => { setView('login'); setErrors({}); }}
        className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft size={18} />
        Kembali ke Login
      </button>
    </form>
  );

  const renderVerifyEmail = () => (
    <div className="text-center py-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail size={40} className="text-green-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Verifikasi Email Anda</h2>
      <p className="text-gray-500 mb-6">
        Kami telah mengirim link verifikasi ke<br />
        <span className="font-medium text-gray-700">{registerEmail}</span>
      </p>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700 text-left">
            Periksa folder spam jika tidak menemukan email verifikasi di inbox Anda.
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          // Simulate resend verification
          alert('Link verifikasi telah dikirim ulang!');
        }}
        className="text-green-600 font-medium hover:text-green-700"
      >
        Kirim Ulang Email Verifikasi
      </button>
      <div className="mt-4">
        <button
          onClick={() => {
            resetForms();
            setView('login');
          }}
          className="text-gray-500 text-sm hover:text-gray-700"
        >
          Kembali ke Login
        </button>
      </div>
    </div>
  );

  const renderResetSent = () => (
    <div className="text-center py-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={40} className="text-green-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Email Terkirim!</h2>
      <p className="text-gray-500 mb-6">
        Link reset password telah dikirim ke<br />
        <span className="font-medium text-gray-700">{forgotEmail}</span>
      </p>
      <p className="text-sm text-gray-400 mb-6">
        Link akan kadaluarsa dalam 24 jam
      </p>
      <button
        onClick={() => {
          resetForms();
          setView('login');
        }}
        className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
      >
        Kembali ke Login
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative bg-white w-full max-w-md rounded-2xl max-h-[90vh] overflow-y-auto animate-scale-up">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Back Button for Register */}
        {view === 'register' && (
          <button
            onClick={() => { setView('login'); setErrors({}); }}
            className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <ArrowLeft size={20} className="text-gray-500" />
          </button>
        )}

        <div className="p-6">
          {view === 'login' && renderLogin()}
          {view === 'register' && renderRegister()}
          {view === 'forgot' && renderForgotPassword()}
          {view === 'verify' && renderVerifyEmail()}
          {view === 'reset-sent' && renderResetSent()}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
