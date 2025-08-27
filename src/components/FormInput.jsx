import React from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export const FormInput = ({
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword = () => {},
  onSubmit = () => {},
}) => (
  <form className="space-y-2" onSubmit={onSubmit}>
    <div className="relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Icon className="h-5 w-5" />
      </div>
      <input
        type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
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
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
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
