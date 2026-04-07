'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/store';

// Dummy data for trending products
const trendingProducts: Product[] = [
  {
    id: '1',
    name: 'Nordic Lounge Chair',
    price: 349.99,
    category: 'Chair',
    image: 'https://picsum.photos/seed/chair1/800/1000',
    rating: 4.8,
    description: 'Minimalist lounge chair with premium fabric and solid oak wood legs.',
  },
  {
    id: '2',
    name: 'Velvet Cloud Sofa',
    price: 1299.00,
    category: 'Sofa',
    image: 'https://picsum.photos/seed/sofa1/800/1000',
    rating: 4.9,
    description: 'Luxurious 3-seater velvet sofa with deep seating and plush cushions.',
  },
  {
    id: '3',
    name: 'Marble Dining Table',
    price: 899.50,
    category: 'Table',
    image: 'https://picsum.photos/seed/table1/800/1000',
    rating: 4.7,
    description: 'Elegant round dining table featuring a genuine marble top and brass base.',
  },
  {
    id: '4',
    name: 'Abstract Ceramic Vase',
    price: 85.00,
    category: 'Decor',
    image: 'https://picsum.photos/seed/decor1/800/1000',
    rating: 4.6,
    description: 'Handcrafted ceramic vase with a unique abstract shape and matte finish.',
  },
];

const categories = [
  { name: 'Sofas', image: 'https://picsum.photos/seed/sofacat/600/600', link: '/products?category=sofa' },
  { name: 'Beds', image: 'https://picsum.photos/seed/bedcat/600/600', link: '/products?category=bed' },
  { name: 'Dining', image: 'https://picsum.photos/seed/diningcat/600/600', link: '/products?category=dining' },
  { name: 'Decors', image: 'https://picsum.photos/seed/decorcat/600/600', link: '/products?category=decor' },
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Interior Designer',
    text: 'The quality of furniture from STORIES is simply unmatched. Their pieces have transformed my clients\' homes into elegant sanctuaries.',
    avatar: 'https://picsum.photos/seed/user1/100/100',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Homeowner',
    text: 'I bought the Velvet Cloud Sofa and it\'s the most comfortable piece of furniture I\'ve ever owned. The delivery was seamless.',
    avatar: 'https://picsum.photos/seed/user2/100/100',
  },
  {
    id: 3,
    name: 'Emma Thompson',
    role: 'Architect',
    text: 'STORIES perfectly balances modern minimalism with true comfort. Their dining tables are a centerpiece in all my recent projects.',
    avatar: 'https://picsum.photos/seed/user3/100/100',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/hero-furniture/1920/1080"
            alt="Elegant Living Room"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight"
          >
            Craft Your Story with <br className="hidden md:block" />
            <span className="text-accent italic">Elegant Living</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90"
          >
            Discover our curated collection of premium furniture and home decors designed to elevate your space.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/products" className="px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-colors w-full sm:w-auto">
              Shop Now
            </Link>
            <Link href="/about" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-medium hover:bg-white/20 transition-colors w-full sm:w-auto">
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-heading font-bold mb-4"
            >
              Shop by Category
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: '60px' }}
              viewport={{ once: true }}
              className="h-1 bg-accent mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={category.link} className="group block relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <h3 className="text-2xl font-heading font-semibold text-white">{category.name}</h3>
                    <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-accent transition-colors">
                      &rarr;
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-heading font-bold mb-4"
              >
                Trending Now
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground max-w-xl"
              >
                Discover our most popular pieces that are currently transforming homes around the world.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mt-6 md:mt-0"
            >
              <Link href="/products" className="text-accent font-medium hover:underline flex items-center gap-2">
                View All Products &rarr;
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-heading font-bold mb-4"
            >
              What Our Clients Say
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: '60px' }}
              viewport={{ once: true }}
              className="h-1 bg-accent mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl shadow-sm border border-border relative"
              >
                <div className="text-accent text-4xl font-heading absolute top-6 right-8 opacity-20">&quot;</div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-foreground/80 italic leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="https://picsum.photos/seed/pattern/1920/1080" alt="Pattern" fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-heading font-bold mb-6"
            >
              Join the STORIES Club
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/70 mb-10 text-lg"
            >
              Subscribe to our newsletter and get 10% off your first purchase. Plus, receive exclusive updates on new collections and design tips.
            </motion.p>
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              onSubmit={(e) => { e.preventDefault(); /* Handle submit */ }}
            >
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors"
                required
              />
              <button type="submit" className="px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}
