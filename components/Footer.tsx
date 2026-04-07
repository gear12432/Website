import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-soft-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-heading font-bold tracking-wider mb-6 inline-block">
              STORIES<span className="text-accent">.</span>
            </Link>
            <p className="text-soft-white/70 mb-6 leading-relaxed">
              Crafting your story with elegant living. We provide premium furniture and home decors that blend luxury with minimalistic design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-soft-white/70 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/products" className="text-soft-white/70 hover:text-accent transition-colors">Shop</Link></li>
              <li><Link href="/contact" className="text-soft-white/70 hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-soft-white/70 hover:text-accent transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              <li><Link href="/products?category=sofa" className="text-soft-white/70 hover:text-accent transition-colors">Sofas</Link></li>
              <li><Link href="/products?category=bed" className="text-soft-white/70 hover:text-accent transition-colors">Beds</Link></li>
              <li><Link href="/products?category=dining" className="text-soft-white/70 hover:text-accent transition-colors">Dining</Link></li>
              <li><Link href="/products?category=decor" className="text-soft-white/70 hover:text-accent transition-colors">Decors</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-accent shrink-0 mt-1" />
                <span className="text-soft-white/70">123 Luxury Avenue, Design District, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-accent shrink-0" />
                <span className="text-soft-white/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-accent shrink-0" />
                <span className="text-soft-white/70">hello@storiesdecor.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-soft-white/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} STORIES Furnitures and Decors. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link href="/privacy" className="text-soft-white/50 hover:text-soft-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-soft-white/50 hover:text-soft-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
