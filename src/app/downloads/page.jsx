'use client'

import { AnimatedBackground } from '@/app/login/page'
import { SuccessAnimation } from '@/app/login/page'
import { Apple, Smartphone, Fuel, CheckCircle, AlertCircle, Download, SquareChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DownloadSection() {
    const router = useRouter();
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <AnimatedBackground />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 text-center">
            <div className="mb-8">
              <SuccessAnimation />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Negzus!
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Your account has been created successfully. Download the Negzus app to start your smart fuel journey.
            </p>
            
            {/* Download Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* iOS Download */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 group">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Apple className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">iOS App</h3>
                <p className="text-gray-400 mb-6">Download for iPhone and iPad</p>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center">
                  <Download className="h-5 w-5 mr-2" />
                  App Store
                </button>
                <p className="text-gray-500 text-sm mt-3">Coming Soon</p>
              </div>
              
              {/* Android Download */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 group">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Android App</h3>
                <p className="text-gray-400 mb-6">Download for Android devices</p>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center">
                  <Download className="h-5 w-5 mr-2" />
                  Google Play
                </button>
                <p className="text-gray-500 text-sm mt-3">Coming Soon</p>
              </div>
            </div>
            
            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Fuel className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">Find Stations</h4>
                <p className="text-gray-400 text-sm">Locate nearby fuel stations instantly</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">Quick Payments</h4>
                <p className="text-gray-400 text-sm">Pay with QR codes seamlessly</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">Real-time Updates</h4>
                <p className="text-gray-400 text-sm">Live fuel availability and prices</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                We'll notify you as soon as the app is available for download.
              </p>
              <button 
                onClick={() => router.push('/')}
                className="w-full gap-2 flex justify-center items-center text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                <SquareChevronLeft />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  