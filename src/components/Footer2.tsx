import logo from "@/assets/logo.png";
import { Twitter, Github, Facebook, Instagram, Youtube } from "lucide-react";

const Footer2 = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="JusPredict Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-white">JusPredict</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-sm">
              The ultimate sports prediction platform. Join thousands of sports enthusiasts and start earning rewards today.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#" aria-label="Twitter" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" aria-label="GitHub" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Sports</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Leaderboard</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Responsible Gaming</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-gray-400">
          <p>&copy; 2025 JusPredict. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;


