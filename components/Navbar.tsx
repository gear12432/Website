'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Heart, User, Menu, X, Moon, Sun, Search } from 'lucide-react';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const user = useStore((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-heading font-bold tracking-wider">
          STORIES<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                pathname === link.path ? 'text-accent' : 'text-foreground/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-5">
          <button onClick={toggleDarkMode} className="text-foreground/80 hover:text-accent transition-colors">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link href="/products" className="text-foreground/80 hover:text-accent transition-colors">
            <Search size={20} />
          </Link>
          <Link href="/wishlist" className="relative text-foreground/80 hover:text-accent transition-colors">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative text-foreground/80 hover:text-accent transition-colors">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>
          <Link href="/auth" className="text-foreground/80 hover:text-accent transition-colors">
            <User size={20} />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border mt-4"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium ${
                    pathname === link.path ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-6 pt-4 border-t border-border">
                <button onClick={toggleDarkMode} className="text-foreground">
                  {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="relative text-foreground">
                  <Heart size={24} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="relative text-foreground">
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </Link>
                <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground">
                  <User size={24} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
