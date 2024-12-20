import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white w-full">
      <div className="mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-black text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400 text-sm">
              KicksCommerce is your premier destination for the latest and
              greatest in footwear fashion.
            </p>
          </div>
          <div>
            <h3 className="text-black text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-gray-400 hover:text-black text-sm">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black text-sm">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black text-sm">
                  Sale
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black text-sm">
                  Collections
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-black text-lg font-semibold mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-black text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black text-sm">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black text-sm">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black text-sm">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-black text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-black">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-black">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-black">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-black">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-800 pt-4">
          <p className="text-black-400 text-sm text-center">
            © {new Date().getFullYear()} KicksCommerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
