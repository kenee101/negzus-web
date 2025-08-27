import { Fuel, MapPin, Zap, Shield, Clock, TrendingUp } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Real-time Location",
      description:
        "Find the closest stations with live GPS tracking and accurate distances.",
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: <Fuel className="h-8 w-8" />,
      title: "Live Availability",
      description:
        "Check fuel, diesel, and gas availability in real-time before you drive.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "QR Payments",
      description:
        "Skip the queues with instant QR code payments and digital receipts.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Price Comparison",
      description:
        "Compare prices across stations and find the best deals near you.",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Safe",
      description:
        "Bank-level security with encrypted transactions and data protection.",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Updates",
      description:
        "Round-the-clock monitoring ensures you always have the latest information.",
      color: "from-indigo-500 to-purple-600",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Powerful Features for
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Smart Fuel Management
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to never worry about fuel again, all in one
            intelligent platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-emerald-500/50 transition-all duration-700 hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-500`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
