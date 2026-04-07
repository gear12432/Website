'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'motion/react';
import { Star, Minus, Plus, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { allProducts } from '@/lib/data';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = allProducts.find((p) => p.id === resolvedParams.id);
  
  const [quantity, setQuantity] = useState(1);
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);

  if (!product) {
    notFound();
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (isWishlisted) {
      toast.info(`${product.name} removed from wishlist.`);
    } else {
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-accent transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-accent transition-colors">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-muted group"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-accent tracking-wider uppercase">{product.category}</span>
              <div className="flex items-center space-x-1 text-accent">
                <Star size={16} className="fill-current" />
                <span className="text-sm font-medium text-foreground">{product.rating} (124 reviews)</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-semibold text-foreground mb-6">${product.price.toFixed(2)}</p>
            
            <div className="prose prose-sm dark:prose-invert mb-8 text-muted-foreground">
              <p>{product.description}</p>
              <p>Crafted with meticulous attention to detail, this piece brings both functionality and aesthetic appeal to your space. The premium materials ensure durability while maintaining a sophisticated look that complements any modern interior.</p>
            </div>

            <div className="flex items-center gap-6 mb-8 border-y border-border py-6">
              <div className="flex items-center border border-input rounded-full bg-background">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-charcoal text-white dark:bg-white dark:text-charcoal px-8 py-4 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button 
                onClick={handleToggleWishlist}
                className={`w-14 h-14 rounded-full flex items-center justify-center border transition-colors shrink-0 ${
                  isWishlisted ? 'bg-accent border-accent text-white' : 'border-input text-foreground hover:border-accent hover:text-accent'
                }`}
              >
                <Heart size={24} className={isWishlisted ? 'fill-current' : ''} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Truck size={18} className="text-foreground" />
                </div>
                <span>Free Shipping over $500</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Shield size={18} className="text-foreground" />
                </div>
                <span>2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <RotateCcw size={18} className="text-foreground" />
                </div>
                <span>30 Days Return</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-border pt-16">
            <h2 className="text-3xl font-heading font-bold mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
