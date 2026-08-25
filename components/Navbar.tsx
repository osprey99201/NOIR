"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar() {
  const { openCart, items } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900 text-white">
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1 text-neutral-300 hover:text-white"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>

          {/* Desktop Left Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <Link href="/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <Link href="/wishlist" className="hover:text-white transition-colors">
              Wishlist ({wishlistItems.length})
            </Link>
          </nav>

          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold tracking-[0.25em] uppercase font-mono text-white"
          >
            NOIR ARCHIVE
          </Link>

          {/* Desktop & Mobile Right Actions */}
          <div className="flex items-center gap-5 text-neutral-300">
            <Link href="/shop" aria-label="Search" className="hover:text-white">
              <Search size={18} />
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hover:text-white relative hidden sm:block"
            >
              <Heart size={18} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-600 text-white font-mono text-[9px] rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              aria-label="Open Shopping Bag"
              className="hover:text-white relative p-1"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black font-mono text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-xs sm:w-80 bg-neutral-950 border-r border-neutral-800 text-white p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Menu
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-neutral-400 hover:text-white"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="mt-8 space-y-6 font-mono text-sm uppercase tracking-wider">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-neutral-300 hover:text-white"
                  >
                    Home
                  </Link>
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-white font-bold underline underline-offset-8"
                  >
                    Shop Collection
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-neutral-300 hover:text-white flex justify-between items-center"
                  >
                    <span>Wishlist</span>
                    <span className="text-xs text-neutral-500">
                      ({wishlistItems.length})
                    </span>
                  </Link>
                </nav>
              </div>

              <div className="border-t border-neutral-900 pt-6 font-mono text-[11px] text-neutral-500 uppercase tracking-widest">
                NOIR ARCHIVE — Portfolio Demo
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}