import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Adebayo Johnson",
      role: "Lagos Business Owner",
      content:
        "Negzus saved me countless hours. No more driving around looking for fuel. The QR payment is incredibly fast!",
      rating: 5,
      avatar: "AJ",
    },
    {
      name: "Sarah Okafor",
      role: "Uber Driver",
      content:
        "As a ride-hail driver, this app is essential. Real-time prices help me maximize profits and serve customers better.",
      rating: 5,
      avatar: "SO",
    },
    {
      name: "Michael Chen",
      role: "Logistics Manager",
      content:
        "Managing a fleet of 50 vehicles was a nightmare. Negzus streamlined our operations and reduced costs by 25%.",
      rating: 5,
      avatar: "MC",
    },
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
            See what our users are saying about their Negzus experience
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
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
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
                  <div className="text-white font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
