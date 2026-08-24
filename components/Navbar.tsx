"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, openCart } = useCartStore();
  const wishlistItems = useWishlistStore((state) => state.items);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8 text-white">
        <Link href="/" className="text-xl font-black uppercase tracking-[0.25em]">
          NOIR
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-neutral-300">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/shop" className="hover:text-white transition-colors">
            Shop
          </Link>
          <Link href="/wishlist" className="hover:text-white transition-colors">
            Wishlist
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <button aria-label="Search" className="text-neutral-300 hover:text-white transition-colors">
            <Search size={18} />
          </button>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative text-neutral-300 hover:text-white transition-colors"
          >
            <Heart size={18} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-mono font-bold text-white">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <button
            onClick={openCart}
            aria-label="Shopping Bag"
            className="relative text-neutral-300 hover:text-white transition-colors"
          >
            <ShoppingBag size={18} />
            {totalQuantity > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-mono font-bold text-black">
                {totalQuantity}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
            className="md:hidden text-neutral-300 hover:text-white transition-colors ml-2"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}