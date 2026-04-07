'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const wishlist = useStore((state) => state.wishlist);

  if (wishlist.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center bg-background">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Heart size={40} className="text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-heading font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Save items you love to your wishlist. Review them anytime and easily move them to your cart.
        </p>
        <Link href="/products" className="px-8 py-4 bg-charcoal text-white dark:bg-white dark:text-charcoal rounded-full font-medium hover:opacity-90 transition-opacity">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-heading font-bold">Your Wishlist</h1>
          <span className="text-muted-foreground font-medium">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
