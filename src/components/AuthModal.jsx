import React, { useState, useEffect } from "react";
import {
  Fuel,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  AlertCircle,
  X,
  Loader,
} from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FormInput } from "@/components//FormInput";
// import { supabase } from "@/utils/supabase";
// import { useUser } from "@/context/UserContext";

export const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const { client } = useUser();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Reset form when switching modes
  useEffect(() => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [isLogin]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!formData.fullName) {
        newErrors.fullName = "Full name is required";
      }

      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
        newErrors.phone = "Phone number is invalid";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
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

      // if (isLogin) {
      //   const { data, error } = await client.auth.signInWithPassword({
      //     email: formData.email,
      //     password: formData.password,
      //   });
      //   if (error) throw error;
      // } else {
      //   const { data, error } = await client.auth.signUp({
      //     email: formData.email,
      //     password: formData.password,
      //     options: {
      //       data: {
      //         full_name: formData.fullName,
      //         phone: formData.phone,
      //       },
      //     },
      //   });
      //   if (error) throw error;
      // }

      onSuccess();
    } catch (error) {
      setErrors({ general: error.message || "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
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
              {isLogin ? "Welcome Back!" : "Join Negzus"}
            </h2>
            <p className="text-gray-400">
              {isLogin
                ? "Sign in to your account to continue"
                : "Create your account to get started"}
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
                  onChange={handleInputChange("fullName")}
                  icon={User}
                  error={errors.fullName}
                  // onSubmit={handleSubmit}
                />

                <FormInput
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
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
              onChange={handleInputChange("email")}
              icon={Mail}
              error={errors.email}
              // onSubmit={handleSubmit}
            />

            <FormInput
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange("password")}
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
                onChange={handleInputChange("confirmPassword")}
                icon={Lock}
                error={errors.confirmPassword}
                showPasswordToggle={true}
                showPassword={showConfirmPassword}
                onTogglePassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
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
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {!isLogin && (
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{" "}
                <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Terms of Service
                </button>{" "}
                and{" "}
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
