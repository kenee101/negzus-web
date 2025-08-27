import { Smartphone, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const CTASection = () => {
  const router = useRouter();
  return (
    <section id="cta" className="py-24 relative">
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
            Join thousands of smart drivers who've already transformed their
            fuel experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push("/downloads")}
              className="group bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-110 flex items-center"
            >
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
