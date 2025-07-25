'use client'

import React, { useState, useEffect } from 'react';
import { 
  Fuel, 
  MapPin, 
  Zap, 
  Shield, 
  Smartphone, 
  Clock, 
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Menu,
  X,
  ChevronDown,
  Users,
  TrendingUp,
  Globe,
} from 'lucide-react';
import Link from 'next/link'


// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0 }) => (
  <div 
    className="animate-bounce"
    style={{ 
      animationDelay: `${delay}s`, 
      animationDuration: '3s',
      animationIterationCount: 'infinite'
    }}
  >
    {children}
  </div>
);

// Header Component
const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-2xl' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Fuel className="h-8 w-8 text-emerald-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Negzus
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <Link href="/features" className="text-white hover:text-emerald-400 transition-colors font-medium">Features </Link> */}
            <a href="#features" className="text-white transition-all duration-3000 hover:text-emerald-400 font-medium">Features</a>
            <a href="#how-it-works" className="text-white transition-all duration-3000 hover:text-emerald-400 font-medium">How It Works</a>
            <a href="#testimonials" className="text-white transition-all duration-3000 hover:text-emerald-400 font-medium">Reviews</a>
            <a href="#pricing" className="text-white transition-all duration-3000 hover:text-emerald-400 font-medium">Pricing</a>
            <Link href='/login' className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 font-medium">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-black/95 rounded-2xl p-6 backdrop-blur-lg">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-white hover:text-emerald-400 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-white hover:text-emerald-400 transition-colors font-medium">How It Works</a>
              <a href="#testimonials" className="text-white hover:text-emerald-400 transition-colors font-medium">Reviews</a>
              <a href="#pricing" className="text-white hover:text-emerald-400 transition-colors font-medium">Pricing</a>
              <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-2 rounded-full font-medium w-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="mb-8">
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
          Find the nearest gas stations, compare prices, check availability, and pay seamlessly with QR codes. 
          Your fuel journey just got smarter.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button className="group bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 flex items-center">
            <Smartphone className="h-5 w-5 mr-2" />
            Download Now
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-2xl text-lg font-bold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center">
            <Play className="h-5 w-5 mr-2" />
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-emerald-400 mb-2">
              <AnimatedCounter end={1200} suffix="+" />
            </div>
            <div className="text-gray-300">Stations</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-cyan-400 mb-2">
              <AnimatedCounter end={50000} suffix="+" />
            </div>
            <div className="text-gray-300">Happy Users</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              <AnimatedCounter end={25} suffix=" States" />
            </div>
            <div className="text-gray-300">Coverage</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              <AnimatedCounter end={99} suffix="%" />
            </div>
            <div className="text-gray-300">Accuracy</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white/60" />
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Real-time Location",
      description: "Find the closest stations with live GPS tracking and accurate distances.",
      color: "from-emerald-500 to-green-600"
    },
    {
      icon: <Fuel className="h-8 w-8" />,
      title: "Live Availability",
      description: "Check fuel, diesel, and gas availability in real-time before you drive.",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "QR Payments",
      description: "Skip the queues with instant QR code payments and digital receipts.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Price Comparison",
      description: "Compare prices across stations and find the best deals near you.",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Safe",
      description: "Bank-level security with encrypted transactions and data protection.",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Updates",
      description: "Round-the-clock monitoring ensures you always have the latest information.",
      color: "from-indigo-500 to-purple-600"
    }
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
            Everything you need to never worry about fuel again, all in one intelligent platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Open App",
      description: "Launch FuelFinder and allow location access for personalized results",
      icon: <Smartphone className="h-12 w-12" />
    },
    {
      step: "02", 
      title: "Find Stations",
      description: "Browse nearby stations with real-time availability and prices",
      icon: <MapPin className="h-12 w-12" />
    },
    {
      step: "03",
      title: "Pay & Go",
      description: "Scan QR code, pay instantly, and drive away without waiting",
      icon: <Zap className="h-12 w-12" />
    }
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
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 group-hover:scale-110 transition-all duration-500">
                    <div className="text-emerald-400">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const plans = [
    {
      name: "Basic",
      price: "0",
      period: "Free Forever",
      description: "Perfect for occasional drivers",
      features: [
        "Find nearby stations",
        "Basic availability info", 
        "Station directions",
        "Basic price comparison",
        "Community updates"
      ],
      notIncluded: [
        "Real-time updates",
        "QR payments",
        "Priority support",
        "Advanced analytics"
      ],
      buttonText: "Get Started Free",
      popular: false,
      color: "from-gray-600 to-gray-700"
    },
    {
      name: "Premium",
      price: "1,500",
      period: "per month",
      description: "Best for regular drivers & ride-hail",
      features: [
        "Real-time fuel availability",
        "Live price updates every 5 minutes",
        "QR code payments",
        "Priority customer support",
        "Fuel alerts & notifications",
        "Price trend analytics",
        "Favorite stations",
        "No ads experience"
      ],
      notIncluded: [
        "Fleet management tools"
      ],
      buttonText: "Start Premium Trial",
      popular: true,
      color: "from-emerald-500 to-cyan-500"
    },
    {
      name: "Business",
      price: "5,000",
      period: "per month",
      description: "For fleets & logistics companies",
      features: [
        "Everything in Premium",
        "Fleet management dashboard",
        "Bulk fuel purchase discounts",
        "QR payments",
        "Advanced reporting & analytics",
        "Multiple vehicle tracking",
        "Custom integration API",
        "Dedicated account manager",
        "Priority fuel reservations"
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      popular: false,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const transactionFees = [
    { range: "₦1,000 - ₦60,000", basicFee: "2.0%", premiumFee: "1.5%", businessFee: "1.0%" },
    { range: "+₦60,000 - ₦120,000", basicFee: "2.5%", premiumFee: "2.0%", businessFee: "1.5%" },
    { range: "+₦120,000", basicFee: "3.0%", premiumFee: "2.5%", businessFee: "2.0%" },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Simple, Transparent
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your fuel needs. All prices in Nigerian Naira.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-emerald-500 shadow-2xl shadow-emerald-500/20' 
                  : 'border-white/10 hover:border-emerald-500/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-white">₦{plan.price.toLocaleString()}</span>
                  {plan.price !== "0" && <span className="text-gray-400 ml-2">/{plan.period.split(' ')[1]}</span>}
                </div>
                <p className="text-gray-400">{plan.period}</p>
                <p className="text-gray-300 mt-2">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <div key={i} className="flex items-center opacity-50">
                    <X className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-500">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 px-6 rounded-2xl font-bold transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg hover:shadow-emerald-500/25 hover:scale-105'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
              }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Transaction Fees Table */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Transaction Fees</h3>
          <p className="text-gray-400 text-center mb-8">
            Transparent pricing for QR code payments. No hidden fees, ever.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-white font-semibold py-4 px-4">Transaction Amount</th>
                  <th className="text-center text-white font-semibold py-4 px-4">Basic</th>
                  <th className="text-center text-emerald-400 font-semibold py-4 px-4">Premium</th>
                  <th className="text-center text-white font-semibold py-4 px-4">Business</th>
                </tr>
              </thead>
              <tbody>
                {transactionFees.map((fee, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="text-gray-300 py-4 px-4">{fee.range}</td>
                    <td className="text-center text-gray-500 py-4 px-4">{fee.basicFee}</td>
                    <td className="text-center text-emerald-400 py-4 px-4 font-semibold">{fee.premiumFee}</td>
                    <td className="text-center text-gray-500 py-4 px-4 font-semibold">{fee.businessFee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              * All fees are calculated on successful transactions only. Failed transactions incur no charges.
            </p>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <Shield className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Secure Payments</h4>
              <p className="text-gray-400 text-sm">Bank-level encryption for all transactions</p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <Clock className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">24/7 Support</h4>
              <p className="text-gray-400 text-sm">Round-the-clock customer assistance</p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Growing Network</h4>
              <p className="text-gray-400 text-sm">1200+ stations and counting nationwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Adebayo Johnson",
      role: "Lagos Business Owner",
      content: "FuelFinder saved me countless hours. No more driving around looking for fuel. The QR payment is incredibly fast!",
      rating: 5,
      avatar: "AJ"
    },
    {
      name: "Sarah Okafor", 
      role: "Uber Driver",
      content: "As a ride-hail driver, this app is essential. Real-time prices help me maximize profits and serve customers better.",
      rating: 5,
      avatar: "SO"
    },
    {
      name: "Michael Chen",
      role: "Logistics Manager", 
      content: "Managing a fleet of 50 vehicles was a nightmare. FuelFinder streamlined our operations and reduced costs by 25%.",
      rating: 5,
      avatar: "MC"
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Loved by Thousands
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what our users are saying about their FuelFinder experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105"
            >
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Never Run Out of
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Fuel Again?
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of smart drivers who've already transformed their fuel experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-110 flex items-center">
              <Smartphone className="h-5 w-5 mr-2" />
              Download Free App
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-2xl text-lg font-bold border border-white/20 hover:bg-white/20 transition-all duration-300">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Fuel className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Negzus
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Smart fuel management for the modern driver. Never run out of fuel again.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <div className="space-y-2">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Features</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Pricing</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">API</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Help Center</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Contact</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Status</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <div className="space-y-2">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">About</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Blog</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors block">Careers</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-400">
            2025. All rights reserved. © Negzus Inc
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
export default function FuelFinderLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}