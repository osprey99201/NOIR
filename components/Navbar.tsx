"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8 text-white">
        {/* Brand Logo */}
        <Link href="/" className="text-xl font-black uppercase tracking-[0.25em]">
          NOIR
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-neutral-300">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/shop" className="hover:text-white transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
        </div>

        {/* Actions (Search, Cart, Mobile Toggle) */}
        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            className="text-neutral-300 hover:text-white transition-colors"
          >
            <Search size={18} />
          </button>

          <button
            aria-label="Shopping Bag"
            className="relative text-neutral-300 hover:text-white transition-colors"
          >
            <ShoppingBag size={18} />
            <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-mono font-bold text-black">
              0
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
            className="md:hidden text-neutral-300 hover:text-white transition-colors ml-2"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-6 py-6 text-xs font-mono uppercase tracking-widest text-neutral-300">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}