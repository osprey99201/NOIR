"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const router = useRouter();
  const { isOpen, closeCart, items, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckoutClick = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-800 text-white p-6 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <h2 className="text-xs font-mono uppercase tracking-widest font-bold">
                  Shopping Bag ({items.length})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="text-neutral-400 hover:text-white p-1 transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="mt-6 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {items.length === 0 ? (
                <div className="py-16 text-center font-mono text-xs uppercase text-neutral-500">
                  Your bag is currently empty.
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 pb-6 border-b border-neutral-900"
                  >
                    <div className="relative w-20 h-24 bg-neutral-900 overflow-hidden flex-shrink-0 border border-neutral-800">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-medium text-white">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-neutral-500 hover:text-red-500 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs font-mono text-neutral-400 uppercase mt-1">
                          Size: {item.size}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-neutral-800 text-xs font-mono">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="p-1.5 text-neutral-400 hover:text-white"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="p-1.5 text-neutral-400 hover:text-white"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="text-sm font-mono text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer Checkout Button */}
          {items.length > 0 && (
            <div className="border-t border-neutral-800 pt-6 space-y-4">
              <div className="flex justify-between text-xs font-mono uppercase text-neutral-400">
                <span>Subtotal</span>
                <span className="text-white font-bold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] font-mono text-neutral-500">
                Taxes and shipping calculated at checkout.
              </p>
              <button
                onClick={handleCheckoutClick}
                className="w-full py-4 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}