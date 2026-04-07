'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product, useStore } from '@/lib/store';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    if (isWishlisted) {
      toast.info(`${product.name} removed from wishlist.`);
    } else {
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <button
              onClick={handleAddToCart}
              className="w-12 h-12 rounded-full bg-white text-charcoal flex items-center justify-center hover:bg-accent hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
              aria-label="Add to cart"
            >
              <ShoppingCart size={20} />
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 ${
                isWishlisted ? 'bg-accent text-white' : 'bg-white text-charcoal hover:bg-accent hover:text-white'
              }`}
              aria-label="Add to wishlist"
            >
              <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
            </button>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-charcoal uppercase tracking-wider">
            {product.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-accent transition-colors line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center space-x-1 text-accent">
              <Star size={14} className="fill-current" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Details &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
