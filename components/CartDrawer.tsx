"use client";

import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { X, Plus, Minus, Trash2 } from "lucide-react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-neutral-950 p-6 text-white shadow-xl border-l border-neutral-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-sm font-mono uppercase tracking-widest font-bold">
            Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Your bag is empty
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 border-b border-neutral-900 pb-6"
              >
                <div className="relative h-24 w-20 bg-neutral-900 overflow-hidden border border-neutral-800 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs font-medium uppercase tracking-wide">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        aria-label="Remove item"
                        className="text-neutral-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="mt-1 text-[10px] font-mono uppercase text-neutral-400">
                      Size: {item.size}
                    </p>
                    <p className="mt-1 text-xs font-mono">${item.price}</p>
                  </div>

                  <div className="flex items-center w-24 border border-neutral-800 text-xs font-mono">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))
                      }
                      className="p-1 text-neutral-400 hover:text-white"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="flex-1 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="p-1 text-neutral-400 hover:text-white"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout CTA */}
        {items.length > 0 && (
          <div className="border-t border-neutral-800 pt-4">
            <div className="flex justify-between text-xs font-mono uppercase mb-4">
              <span className="text-neutral-400">Subtotal</span>
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-white py-4 text-xs font-mono uppercase tracking-widest font-bold text-black hover:bg-neutral-200 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}