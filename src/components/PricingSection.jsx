import { Shield, Clock, CheckCircle, X, Users } from "lucide-react";

export const PricingSection = () => {
  const plans = [
    {
      name: "Basic",
      price: "0",
      period: "Free",
      description: "Perfect for occasional drivers",
      features: [
        "Find nearby stations",
        "Basic availability info",
        "Station directions",
        "Basic price comparison",
        "Community updates",
      ],
      notIncluded: [
        "Real-time updates",
        "QR payments",
        "Priority support",
        "Advanced analytics",
      ],
      buttonText: "Get Started Free",
      popular: false,
      color: "from-gray-600 to-gray-700",
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
        "No ads experience",
      ],
      notIncluded: ["Fleet management tools"],
      buttonText: "Start Premium Trial",
      popular: true,
      color: "from-emerald-500 to-cyan-500",
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
        "Priority fuel reservations",
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      popular: false,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const transactionFees = [
    {
      range: "₦1,000 - ₦60,000",
      basicFee: "2.0%",
      premiumFee: "1.5%",
      businessFee: "1.0%",
    },
    {
      range: "+₦60,000 - ₦120,000",
      basicFee: "2.5%",
      premiumFee: "2.0%",
      businessFee: "1.5%",
    },
    {
      range: "+₦120,000",
      basicFee: "3.0%",
      premiumFee: "2.5%",
      businessFee: "2.0%",
    },
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
            Choose the perfect plan for your fuel needs. All prices in Nigerian
            Naira.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                plan.popular
                  ? "border-emerald-500 shadow-2xl shadow-emerald-500/20"
                  : "border-white/10 hover:border-emerald-500/50"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-bold animate-pulse">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-white">
                    ₦{plan.price.toLocaleString()}
                  </span>
                  {plan.price !== "0" && (
                    <span className="text-gray-400 ml-2">
                      /{plan.period.split(" ")[1]}
                    </span>
                  )}
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

              <button
                className={`w-full py-3 px-6 rounded-2xl font-bold transition-all duration-500 ${
                  plan.popular
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg hover:shadow-emerald-500/25 hover:scale-105 hover:from-emerald-400 hover:to-cyan-400"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-emerald-500/50"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Transaction Fees Table */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Transaction Fees
          </h3>
          <p className="text-gray-400 text-center mb-8">
            Transparent pricing for QR code payments. No hidden fees, ever.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-white font-semibold py-4 px-4">
                    Transaction Amount
                  </th>
                  <th className="text-center text-white font-semibold py-4 px-4">
                    Basic
                  </th>
                  <th className="text-center text-emerald-400 font-semibold py-4 px-4">
                    Premium
                  </th>
                  <th className="text-center text-white font-semibold py-4 px-4">
                    Business
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactionFees.map((fee, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="text-gray-300 py-4 px-4">{fee.range}</td>
                    <td className="text-center text-gray-500 py-4 px-4">
                      {fee.basicFee}
                    </td>
                    <td className="text-center text-emerald-400 py-4 px-4 font-semibold">
                      {fee.premiumFee}
                    </td>
                    <td className="text-center text-gray-500 py-4 px-4 font-semibold">
                      {fee.businessFee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              * All fees are calculated on successful transactions only. Failed
              transactions incur no charges.
            </p>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <Shield className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Secure Payments</h4>
              <p className="text-gray-400 text-sm">
                Bank-level encryption for all transactions
              </p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <Clock className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">24/7 Support</h4>
              <p className="text-gray-400 text-sm">
                Round-the-clock customer assistance
              </p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Growing Network</h4>
              <p className="text-gray-400 text-sm">
                1200+ stations and counting nationwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
