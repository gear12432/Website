'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Shield } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center bg-background">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-heading font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven&apos;t added any items to your cart yet. Explore our collection to find something you love.
        </p>
        <Link href="/products" className="px-8 py-4 bg-charcoal text-white dark:bg-white dark:text-charcoal rounded-full font-medium hover:opacity-90 transition-opacity">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-heading font-bold mb-10">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="hidden sm:grid grid-cols-12 gap-4 p-6 border-b border-border bg-muted/30 text-sm font-medium text-muted-foreground">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-border">
                {cart.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
                  >
                    <div className="col-span-6 flex items-center gap-4 w-full">
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-muted">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <Link href={`/products/${item.id}`} className="font-heading font-semibold text-lg hover:text-accent transition-colors line-clamp-1">
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-destructive hover:underline mt-2 flex items-center gap-1"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="col-span-2 text-center w-full sm:w-auto flex justify-between sm:block">
                      <span className="sm:hidden text-muted-foreground">Price:</span>
                      <span className="font-medium">${item.price.toFixed(2)}</span>
                    </div>

                    <div className="col-span-2 flex justify-center w-full sm:w-auto">
                      <div className="flex items-center border border-input rounded-full bg-background">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="col-span-2 text-right w-full sm:w-auto flex justify-between sm:block">
                      <span className="sm:hidden text-muted-foreground">Total:</span>
                      <span className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm sticky top-28">
              <h2 className="text-2xl font-heading font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-accent">Add ${(500 - subtotal).toFixed(2)} more to get free shipping!</p>
                )}
              </div>

              <div className="border-t border-border pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-right">Including VAT</p>
              </div>

              <Link 
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-accent text-white px-6 py-4 rounded-full font-medium hover:bg-accent/90 transition-colors"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </Link>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield size={16} />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
