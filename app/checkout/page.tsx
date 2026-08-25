"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import { Lock, ShieldCheck, CheckCircle2, ArrowRight, Loader2, Sparkles } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [formData, setFormData] = useState({
    email: "portfolio.demo@example.com",
    firstName: "Alex",
    lastName: "Morgan",
    address: "742 Evergreen Terrace",
    city: "Los Angeles",
    postalCode: "90001",
    cardNumber: "4242 •••• •••• 4242",
    expDate: "12/28",
    cvc: "123",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate payment API call latency for realistic feel
    setTimeout(() => {
      setSubmitting(false);
      setOrderComplete(true);
      clearCart();
    }, 1800);
  };

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white">
        <Navbar />
        <div className="mx-auto max-w-2xl px-6 pt-40 pb-24 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20 mb-6 animate-bounce">
            <CheckCircle2 size={40} />
          </div>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400">
            Order Confirmed #NA-84920
          </p>
          <h1 className="mt-3 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Thank you for your purchase
          </h1>
          <p className="mt-4 text-sm text-neutral-400 font-light max-w-md mx-auto">
            We've sent a detailed receipt and shipping updates to{" "}
            <span className="text-white font-mono">{formData.email}</span>.
          </p>

          <div className="mt-8 p-6 bg-neutral-900 border border-neutral-800 rounded-lg text-left text-xs font-mono text-neutral-400 space-y-2">
            <p className="text-white uppercase font-bold mb-3 flex items-center justify-between">
              <span>Demo Transaction Summary</span>
              <span className="bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded text-[10px]">SUCCESS</span>
            </p>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span>Shipping to</span>
              <span className="text-white">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span>Amount Paid</span>
              <span className="text-white font-bold">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-4 bg-white text-black text-xs font-mono uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white">
        <Navbar />
        <div className="mx-auto max-w-md px-6 pt-40 text-center font-mono">
          <p className="text-xs uppercase text-neutral-400 mb-4">Your bag is empty</p>
          <Link href="/shop" className="underline text-xs uppercase text-white">
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6 mb-12">
          <h1 className="text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
            Checkout
          </h1>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 border border-emerald-500/20">
            <Sparkles size={14} />
            <span>Portfolio Demo Mode</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                01. Contact Details
              </h2>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email Address"
                className="w-full bg-neutral-900 border border-neutral-800 p-3.5 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {/* Shipping */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                02. Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="First Name"
                  className="bg-neutral-900 border border-neutral-800 p-3.5 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors"
                />
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Last Name"
                  className="bg-neutral-900 border border-neutral-800 p-3.5 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street Address"
                className="w-full bg-neutral-900 border border-neutral-800 p-3.5 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors mb-4"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City"
                  className="bg-neutral-900 border border-neutral-800 p-3.5 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors"
                />
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="Postal Code"
                  className="bg-neutral-900 border border-neutral-800 p-3.5 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            {/* Payment */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  03. Payment Method
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                  <Lock size={12} />
                  <span>Encrypted 256-bit</span>
                </div>
              </div>

              <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-4">
                <input
                  type="text"
                  readOnly
                  value={formData.cardNumber}
                  className="w-full bg-neutral-950 border border-neutral-800 p-3.5 text-xs font-mono text-neutral-300"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    readOnly
                    value={`EXP: ${formData.expDate}`}
                    className="bg-neutral-950 border border-neutral-800 p-3.5 text-xs font-mono text-neutral-300"
                  />
                  <input
                    type="text"
                    readOnly
                    value={`CVC: ${formData.cvc}`}
                    className="bg-neutral-950 border border-neutral-800 p-3.5 text-xs font-mono text-neutral-300"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-5 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>Processing Order...</span>
                </>
              ) : (
                <>
                  <span>Complete Demo Order — ${total.toFixed(2)}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Summary Side */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 bg-neutral-900 border border-neutral-800 p-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">
                Order Summary ({items.length})
              </h3>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-2 mb-6 divide-y divide-neutral-800">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="pt-4 first:pt-0 flex items-center gap-4">
                    <div className="relative w-14 h-16 bg-neutral-950 overflow-hidden flex-shrink-0 border border-neutral-800">
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{item.name}</p>
                      <p className="text-[11px] font-mono text-neutral-400 mt-0.5">
                        QTY: {item.quantity} | SIZE: {item.size}
                      </p>
                    </div>
                    <p className="text-xs font-mono text-white">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-800 pt-4 space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-800 pt-3 text-sm text-white font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-500 pt-4 border-t border-neutral-800">
                <ShieldCheck size={14} />
                <span>Instant Portfolio Order Flow Demo</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
}