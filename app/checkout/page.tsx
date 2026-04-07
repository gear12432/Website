'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useStore((state) => state.cart);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const [orderId, setOrderId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderId(`ORD-${Math.floor(Math.random() * 100000)}`);
      setIsSuccess(true);
      toast.success('Order placed successfully!');
      // In a real app, we would clear the cart here
      // useStore.setState({ cart: [] });
    }, 2000);
  };

  if (cart.length === 0 && !isSuccess) {
    router.push('/cart');
    return null;
  }

  if (isSuccess) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center bg-background">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-4xl font-heading font-bold mb-4 text-center">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Thank you for your purchase. Your order #{orderId} has been placed and is being processed.
        </p>
        <button 
          onClick={() => {
            useStore.setState({ cart: [] });
            router.push('/');
          }}
          className="px-8 py-4 bg-charcoal text-white dark:bg-white dark:text-charcoal rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-heading font-bold mb-10">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Details */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-2">
                  <Truck size={24} className="text-accent" /> Shipping Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Street Address</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Postal Code</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input required type="tel" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-2">
                  <CreditCard size={24} className="text-accent" /> Payment Method
                </h2>
                
                <div className="space-y-4">
                  <label className={`block p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="card" 
                          checked={paymentMethod === 'card'} 
                          onChange={() => setPaymentMethod('card')}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="font-medium">Credit / Debit Card</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-5 bg-muted rounded"></div>
                        <div className="w-8 h-5 bg-muted rounded"></div>
                      </div>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-2">
                          <label className="text-xs text-muted-foreground">Card Number</label>
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-3 py-2 rounded border border-input bg-background text-sm focus:outline-none focus:border-accent" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Expiry Date</label>
                          <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 rounded border border-input bg-background text-sm focus:outline-none focus:border-accent" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">CVC</label>
                          <input type="text" placeholder="123" className="w-full px-3 py-2 rounded border border-input bg-background text-sm focus:outline-none focus:border-accent" />
                        </div>
                      </div>
                    )}
                  </label>

                  <label className={`block p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="cod" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  'Place Order'
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm sticky top-28">
              <h2 className="text-2xl font-heading font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded overflow-hidden shrink-0 bg-muted">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-end">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
