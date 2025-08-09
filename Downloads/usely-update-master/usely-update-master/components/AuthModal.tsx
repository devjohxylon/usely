'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, UserPlus, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { createPortal } from 'react-dom';
import { useUser } from '../contexts/UserContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const { login, register, signInWithGoogle } = useUser();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    rememberMe: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (mode === 'register') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      let result;
      
      if (mode === 'login') {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.email, formData.password, formData.name);
      }
      
      if (result.success) {
        onClose();
      } else {
        setErrors({ general: result.error || (mode === 'login' ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.') });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setFormData({ email: '', password: '', confirmPassword: '', name: '', rememberMe: false });
    setErrors({});
  };

  // Update mode when initialMode prop changes
  useEffect(() => {
    setMode(initialMode);
    setFormData({ email: '', password: '', confirmPassword: '', name: '', rememberMe: false });
    setErrors({});
  }, [initialMode]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      // Ensure modal is on top of everything
      document.body.style.position = 'relative';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
    };
  }, [isOpen, onClose]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg pointer-events-auto"
          style={{ position: 'fixed', zIndex: 9999 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30, rotateX: -10 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 35,
              mass: 0.8,
              duration: 0.5
            }}
            className="relative w-full max-w-md z-[10000]"
            style={{ position: 'relative', zIndex: 10000 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
              className="bg-background/10 border border-border/60 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden pointer-events-auto"
              style={{ position: 'relative', zIndex: 10001 }}
            >
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
                className="flex items-center justify-between p-6 border-b border-border/20"
              >
                <div className="flex items-center gap-3">
                  {mode === 'login' ? (
                    <LogIn size={20} className="text-white" />
                  ) : (
                    <UserPlus size={20} className="text-white" />
                  )}
                  <h2 className="text-xl font-bold text-white">
                    {mode === 'login' ? 'Login' : 'Register'}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={20} className="text-white/70 hover:text-white" />
                </button>
              </motion.div>

              {/* Form */}
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                onSubmit={handleSubmit} 
                className="p-6 space-y-4"
              >
                {/* General Error */}
                {errors.general && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{errors.general}</p>
                  </div>
                )}

                {/* Google Auth Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isGoogleLoading}
                  onClick={async () => {
                    setIsGoogleLoading(true);
                    try {
                      const result = await signInWithGoogle();
                      if (result.success) {
                        onClose();
                      } else {
                        setErrors({ general: result.error || 'Google authentication failed. Please try again.' });
                      }
                    } catch (error) {
                      console.error('Google Auth error:', error);
                      setErrors({ general: 'Google authentication failed. Please try again.' });
                    } finally {
                      setIsGoogleLoading(false);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center justify-center gap-3 py-3 px-4 border rounded-lg transition-all duration-200",
                    isGoogleLoading 
                      ? "bg-white/5 border-white/20 text-white/50 cursor-not-allowed" 
                      : "bg-white/8 border-white/20 text-white hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-white/10"
                  )}
                >
                  {isGoogleLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="font-medium">Connecting...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="font-medium">
                        Continue with Google
                      </span>
                    </>
                  )}
                </motion.button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/30"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background/5 px-2 text-white/50">Or continue with email</span>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={cn(
                        "w-full pl-10 pr-4 py-3 bg-white/8 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/40 transition-all duration-200",
                        errors.email ? "border-red-500/50 focus:border-red-500/70" : "border-white/20 focus:border-white/40"
                      )}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs">{errors.email}</p>
                  )}
                </div>

                {/* Name Field (Register only) */}
                {mode === 'register' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={cn(
                          "w-full pl-10 pr-4 py-3 bg-white/8 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/40 transition-all duration-200",
                          errors.name ? "border-red-500/50 focus:border-red-500/70" : "border-white/20 focus:border-white/40"
                        )}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-400 text-xs">{errors.name}</p>
                    )}
                  </div>
                )}

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={cn(
                        "w-full pl-10 pr-12 py-3 bg-white/8 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/40 transition-all duration-200",
                        errors.password ? "border-red-500/50 focus:border-red-500/70" : "border-white/20 focus:border-white/40"
                      )}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff size={16} className="text-white/50" />
                      ) : (
                        <Eye size={16} className="text-white/50" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-xs">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password (Login only) */}
                {mode === 'login' && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={formData.rememberMe}
                          onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                          className="peer sr-only"
                        />
                        <div className={cn(
                          "w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center",
                          "group-hover:border-white/40 group-hover:bg-white/5",
                          formData.rememberMe 
                            ? "bg-white border-white shadow-lg shadow-white/20" 
                            : "bg-white/5 border-white/30"
                        )}>
                          {formData.rememberMe && (
                            <motion.svg
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="w-3 h-3 text-black"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </motion.svg>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-white/80 group-hover:text-white transition-colors duration-200 font-medium">
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        // TODO: Implement forgot password
                        console.log('Forgot password clicked');
                      }}
                      className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Confirm Password Field (Register only) */}
                {mode === 'register' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={cn(
                          "w-full pl-10 pr-12 py-3 bg-white/8 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/40 transition-all duration-200",
                          errors.confirmPassword ? "border-red-500/50 focus:border-red-500/70" : "border-white/20 focus:border-white/40"
                        )}
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} className="text-white/50" />
                        ) : (
                          <Eye size={16} className="text-white/50" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-xs">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3, ease: "easeOut" }}
                  type="submit"
                  disabled={isLoading}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  className={cn(
                    "w-full py-3 px-4 font-semibold rounded-lg transition-colors mt-6 flex items-center justify-center",
                    isLoading 
                      ? "bg-white/50 text-black/50 cursor-not-allowed" 
                      : "bg-white text-black hover:bg-white/90"
                  )}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                      {mode === 'login' ? 'Logging in...' : 'Creating account...'}
                    </>
                  ) : (
                    mode === 'login' ? 'Login' : 'Register'
                  )}
                </motion.button>

                {/* Switch Mode */}
                <div className="text-center pt-4">
                  <span className="text-white/60 text-sm">
                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <button
                    type="button"
                    onClick={switchMode}
                    className="text-white font-medium hover:underline transition-colors"
                  >
                    {mode === 'login' ? 'Register' : 'Login'}
                  </button>
                </div>
              </motion.form>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use portal to render modal at document body level
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
} 