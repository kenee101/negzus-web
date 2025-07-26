'use client'

import React, { useState, useEffect } from 'react';
import { 
  Fuel, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Download,
  Apple,
  X,
  Loader
} from 'lucide-react';
import { SuccessAnimation } from '@/components/SuccessAnimation';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import Link from 'next/link';

// Animated Background Component
// export const AnimatedBackground = () => (
//   <div className="absolute inset-0 overflow-hidden">
//     <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
//     <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
//   </div>
// );

// Form Input Component
const FormInput = ({ 
  type, 
  placeholder, 
  value, 
  onChange, 
  icon: Icon, 
  error,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword = () => {},
  onSubmit = () => {}
}) => (
  <form className="space-y-2" onSubmit={onSubmit}>
    <div className="relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Icon className="h-5 w-5" />
      </div>
      <input
        type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}
    </div>
    {error && (
      <div className="flex items-center space-x-2 text-red-400 text-sm">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    )}
  </form>
);

// Success Animation Component
// export const SuccessAnimation = () => (
//   <div className="flex items-center justify-center">
//     <div className="relative">
//       <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center animate-pulse">
//         <CheckCircle className="h-8 w-8 text-white" />
//       </div>
//       <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full animate-ping opacity-75"></div>
//     </div>
//   </div>
// );


// Auth Modal Component
const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  // Error state
  const [errors, setErrors] = useState({});

  // Reset form when switching modes
  useEffect(() => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [isLogin]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
        newErrors.phone = 'Phone number is invalid';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('handleSubmit');
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              phone: formData.phone,
            }
          }
        });
        if (error) throw error;
      }
      
      onSuccess();
    } catch (error) {
      setErrors({ general: error.message || 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-md w-full">
        <AnimatedBackground />
        
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="relative">
                <Fuel className="h-8 w-8 text-emerald-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Negzus
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back!' : 'Join Negzus'}
            </h2>
            <p className="text-gray-400">
              {isLogin 
                ? 'Sign in to your account to continue' 
                : 'Create your account to get started'
              }
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {errors.general && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {errors.general}
              </div>
            )}
            
            {!isLogin && (
              <>
                <FormInput
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange('fullName')}
                  icon={User}
                  error={errors.fullName}
                  // onSubmit={handleSubmit}
                />
                
                <FormInput
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  icon={Phone}
                  error={errors.phone}
                  // onSubmit={handleSubmit}
                />
              </>
            )}
            
            <FormInput
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange('email')}
              icon={Mail}
              error={errors.email}
              // onSubmit={handleSubmit}
            />
            
            <FormInput
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange('password')}
              icon={Lock}
              error={errors.password}
              showPasswordToggle={true}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onSubmit={handleSubmit}
            />
            
            {!isLogin && (
              <FormInput
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                icon={Lock}
                error={errors.confirmPassword}
                showPasswordToggle={true}
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                onSubmit={handleSubmit}
              />
            )}
            
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}
            
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </button>
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
          
          {!isLogin && (
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{' '}
                <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Privacy Policy
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function NegzusAuth() {
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDownloadSection, setShowDownloadSection] = useState(false);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowDownloadSection(true);
  };

  useEffect(() => {
    if (showDownloadSection) {
      router.push('/downloads');
    }
  }, [showDownloadSection, router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative">
      <AnimatedBackground />
      
      <div className="text-center relative z-10 px-6">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Fuel className="h-12 w-12 text-emerald-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Negzus
            </span>
          </Link>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Smart Fuel Management
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Made Simple
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join thousands of smart drivers who never run out of fuel again
        </p>

        <div className='flex space-x-4 items-center justify-center'>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 inline-flex items-center"
          >
            <User className="h-5 w-5 mr-2" />
            Create Account
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>

          {/* <button
            onClick={() => setShowAuthModal(true)}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 inline-flex items-center"
          >
            <User className="h-5 w-5 mr-2" />
            Signup
            <ArrowRight className="h-5 w-5 ml-2" />
          </button> */}
        </div>
      </div>
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}