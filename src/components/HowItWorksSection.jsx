import { MapPin, Zap, Smartphone } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Open App",
      description:
        "Launch Negzus and allow location access for personalized results",
      icon: <Smartphone className="h-12 w-12" />,
    },
    {
      step: "02",
      title: "Find Stations",
      description:
        "Browse nearby stations with real-time availability and prices",
      icon: <MapPin className="h-12 w-12" />,
    },
    {
      step: "03",
      title: "Pay & Go",
      description:
        "Scan QR code, pay instantly, and drive away without waiting",
      icon: <Zap className="h-12 w-12" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get fuel in three simple steps. It's that easy.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 group-hover:scale-110 transition-all duration-700 group-hover:border-emerald-500/50">
                    <div className="text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
