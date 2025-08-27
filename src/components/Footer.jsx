import { Fuel } from "lucide-react";

export const Footer = () => {
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
              Smart fuel management for the modern driver. Never run out of fuel
              again.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <div className="space-y-2">
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors block"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors block"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors block"
              >
                API
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors block"
              >
                Help Center
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors block"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors block"
              >
                Status
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <div className="space-y-2">
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors block"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors block"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors block"
              >
                Careers
              </a>
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
