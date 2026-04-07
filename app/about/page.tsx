'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/about-hero/1920/1080"
            alt="STORIES Workshop"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold mb-6"
          >
            The STORIES Concept
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl max-w-2xl mx-auto text-white/90"
          >
            More than just furniture. We create pieces that become part of your life&apos;s narrative.
          </motion.p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://picsum.photos/seed/about-story/800/600"
              alt="Craftsmanship"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2010, STORIES began with a simple belief: the spaces we inhabit shape the lives we lead. What started as a small workshop crafting bespoke wooden tables has grown into a global brand synonymous with elegant, mindful living.
              </p>
              <p>
                We don&apos;t just design furniture; we design backdrops for your life&apos;s most important moments. The dining table where families gather, the sofa where friends confide, the bed where dreams are born.
              </p>
              <p>
                Every piece in our collection is a testament to our commitment to quality, sustainability, and timeless design. We source materials responsibly and work with master artisans who pour their expertise into every detail.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/30 py-24 mb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card p-12 rounded-2xl shadow-sm border border-border"
            >
              <h3 className="text-2xl font-heading font-bold mb-4 text-accent">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To inspire and elevate everyday living through thoughtfully designed, high-quality furniture that brings beauty, comfort, and functionality to every home.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card p-12 rounded-2xl shadow-sm border border-border"
            >
              <h3 className="text-2xl font-heading font-bold mb-4 text-accent">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the world&apos;s most trusted destination for premium home decor, recognized for our unwavering dedication to craftsmanship, sustainable practices, and exceptional design.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lifestyle Images */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">The STORIES Lifestyle</h2>
          <div className="h-1 bg-accent mx-auto w-16" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item, index) => (
            <motion.div 
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-xl overflow-hidden ${index === 0 || index === 3 ? 'aspect-square' : 'aspect-[3/4] md:aspect-square'}`}
            >
              <Image
                src={`https://picsum.photos/seed/lifestyle${item}/600/800`}
                alt={`Lifestyle ${item}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
