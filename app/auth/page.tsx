'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo authentication
    if (email && password) {
      setUser({ name: isLogin ? 'Demo User' : name, email });
      toast.success(isLogin ? 'Logged in successfully!' : 'Account created successfully!');
      router.push('/');
    } else {
      toast.error('Please fill in all fields.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <Link href="/" className="text-3xl font-heading font-bold tracking-wider inline-block mb-6">
            STORIES<span className="text-accent">.</span>
          </Link>
          <h2 className="text-3xl font-heading font-bold text-foreground">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isLogin ? 'Enter your details to access your account.' : 'Join us to craft your elegant living story.'}
          </p>
        </div>

        <div className="bg-card p-8 rounded-2xl shadow-xl border border-border">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    placeholder="John Doe"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                {isLogin && (
                  <a href="#" className="text-xs text-accent hover:underline">Forgot password?</a>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-charcoal text-white dark:bg-white dark:text-charcoal rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-accent font-medium hover:underline focus:outline-none"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
