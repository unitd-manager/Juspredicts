import logo from "@/assets/logo.png";
import { Twitter, Github, Linkedin } from "lucide-react";

const Footer2 = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="JusPredict Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-white">JusPredict</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              The next generation prediction market platform. Trade on real-world events with confidence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Markets</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 JusPredict. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;


