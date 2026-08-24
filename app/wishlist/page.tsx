"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { Trash2, ShoppingBag, Heart } from "lucide-react";

export default function WishlistPage() {
  const { items, toggleWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6 mb-12">
          <div>
            <h1 className="text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
              Wishlist
            </h1>
            <p className="mt-1 text-xs font-mono text-neutral-400 uppercase tracking-widest">
              Saved Pieces ({items.length})
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center">
            <Heart size={48} className="mx-auto text-neutral-700 mb-4" />
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">
              Your wishlist is currently empty
            </p>
            <Link
              href="/shop"
              className="inline-block bg-white text-black font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 hover:bg-neutral-200 transition-colors"
            >
              Explore Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col bg-neutral-900/40 border border-neutral-800/80 p-4 transition-all hover:border-neutral-700"
              >
                <div className="relative aspect-[3/4] w-full bg-neutral-900 overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={() => toggleWishlist(item)}
                    aria-label="Remove from wishlist"
                    className="absolute top-3 right-3 z-10 bg-black/60 p-2 text-white hover:text-red-400 backdrop-blur-md transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                      {item.category}
                    </p>
                    <Link
                      href={`/product/${item.id}`}
                      className="mt-1 block text-sm font-medium uppercase hover:text-neutral-300 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs font-mono text-neutral-400">
                      ${item.price}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      addItem({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        size: "M",
                        quantity: 1,
                      })
                    }
                    className="mt-6 w-full bg-white py-3 text-xs font-mono uppercase font-bold text-black hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}