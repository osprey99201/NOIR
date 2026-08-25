"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useSearchStore } from "@/store/useSearchStore";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { toggleCart, items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { openSearch } = useSearchStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartItems = mounted
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;
  const totalWishlistItems = mounted ? wishlistItems.length : 0;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between">
        {/* Left Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-neutral-400">
          <Link href="/shop" className="hover:text-white transition-colors">
            Shop
          </Link>
          <Link href="/wishlist" className="hover:text-white transition-colors">
            Wishlist
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-1"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Center Logo */}
        <Link href="/" className="text-xl font-black uppercase tracking-[0.3em] text-white">
          NOIR ARCHIVE
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-5 text-white">
          <button
            onClick={openSearch}
            className="text-neutral-400 hover:text-white transition-colors p-1"
            aria-label="Search catalog"
          >
            <Search size={19} />
          </button>

          <Link
            href="/wishlist"
            className="relative text-neutral-400 hover:text-white transition-colors p-1"
            aria-label="Wishlist"
          >
            <Heart size={19} />
            {totalWishlistItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-mono font-bold text-white">
                {totalWishlistItems}
              </span>
            )}
          </Link>

          <button
            onClick={toggleCart}
            className="relative text-neutral-400 hover:text-white transition-colors p-1"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={19} />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-mono font-bold text-black">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-neutral-950 border-b border-neutral-800 p-6 flex flex-col gap-4 text-xs font-mono uppercase tracking-widest text-neutral-300">
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white py-2 border-b border-neutral-900"
          >
            Shop
          </Link>
          <Link
            href="/wishlist"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white py-2 border-b border-neutral-900"
          >
            Wishlist
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openSearch();
            }}
            className="text-left hover:text-white py-2 flex items-center justify-between"
          >
            <span>Search</span>
            <Search size={16} />
          </button>
        </div>
      )}
    </header>
  );
}