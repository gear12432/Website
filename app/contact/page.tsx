'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully! We will get back to you soon.');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-16 mb-16 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Have a question about our products, your order, or need design advice? We&apos;re here to help.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-heading font-bold mb-8">Contact Information</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Our Showroom</h3>
                  <p className="text-muted-foreground">123 Luxury Avenue, Design District<br />New York, NY 10001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567<br />Toll Free: 1-800-STORIES</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">hello@storiesdecor.com<br />support@storiesdecor.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Business Hours</h3>
                  <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 8:00 PM<br />Saturday - Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Google Map Embed (Placeholder) */}
            <div className="w-full h-64 bg-muted rounded-2xl overflow-hidden relative border border-border">
              {/* In a real app, use an actual iframe from Google Maps */}
              <div className="absolute inset-0 flex items-center justify-center bg-card">
                <p className="text-muted-foreground flex items-center gap-2">
                  <MapPin size={20} /> Map Integration Here
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-lg"
          >
            <h2 className="text-3xl font-heading font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input required type="email" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all" placeholder="john@example.com" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <input required type="text" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all" placeholder="How can we help?" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea required rows={5} className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none" placeholder="Write your message here..."></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-charcoal text-white dark:bg-white dark:text-charcoal rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
