'use client'

import { CheckCircle } from 'lucide-react';

export const SuccessAnimation = () => (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center animate-pulse">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full animate-ping opacity-75"></div>
      </div>
    </div>
  );