import { FloatingElement } from "@/components/FloatingElement";
import { smoothScrollTo } from "@/utils/smoothScrollTo";
import { ChevronDown, Zap } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="my-12 mb-4">
          <FloatingElement delay={0}>
            <div className="inline-flex items-center bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-lg border border-emerald-500/30">
              <Zap className="h-4 w-4 mr-2" />
              Real-time fuel tracking
            </div>
          </FloatingElement>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-emerald-100 to-cyan-100 bg-clip-text text-transparent">
            Never Run Out of
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Fuel Again
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Find the nearest gas stations, compare prices, check availability, and
          pay seamlessly with QR codes. Your fuel journey just got smarter.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-500 hover:scale-105">
            <div className="text-3xl font-bold text-emerald-400 mb-2">
              <AnimatedCounter end={100} suffix="+" />
            </div>
            <div className="text-gray-300">Stations</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:scale-105">
            <div className="text-3xl font-bold text-cyan-400 mb-2">
              <AnimatedCounter end={50000} suffix="+" />
            </div>
            <div className="text-gray-300">Happy Users</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:scale-105">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              <AnimatedCounter end={20} suffix=" States" />
            </div>
            <div className="text-gray-300">Coverage</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all duration-500 hover:scale-105">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              <AnimatedCounter end={90} suffix="%" />
            </div>
            <div className="text-gray-300">Accuracy</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => smoothScrollTo("features")}
      >
        <ChevronDown className="h-6 w-6 text-white/60 hover:text-emerald-400 transition-colors duration-300" />
      </div>
    </section>
  );
};
