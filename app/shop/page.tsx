"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SlidersHorizontal, ArrowUpRight } from "lucide-react";

const ALL_PRODUCTS = [
  {
    id: "1",
    name: "Oversized Heavyweight Hoodie",
    category: "Outerwear",
    price: 120,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Architectural Cargo Pants",
    category: "Bottoms",
    price: 160,
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Boxy Essential Tee",
    category: "Tops",
    price: 65,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Minimalist Trench Coat",
    category: "Outerwear",
    price: 280,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Structure Oversized Jacket",
    category: "Outerwear",
    price: 210,
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Heavyweight Boxy Hoodie",
    category: "Tops",
    price: 140,
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop",
  },
];

const CATEGORIES = ["All", "Outerwear", "Tops", "Bottoms"];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  // Filter products by category
  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    if (selectedCategory === "All") return true;
    return product.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "low-to-high") return a.price - b.price;
    if (sortBy === "high-to-low") return b.price - a.price;
    return 0; // Default sorting
  });

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-8">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
            Archive Collection
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight uppercase sm:text-5xl">
            All Products
          </h1>
        </div>

        {/* Filter & Sort Bar */}
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-800 pb-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 transition-colors border ${
                  selectedCategory === cat
                    ? "border-white bg-white text-black"
                    : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-400">
            <SlidersHorizontal size={14} />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-neutral-800 text-white px-2 py-1 text-xs font-mono uppercase focus:outline-none focus:border-neutral-600 cursor-pointer"
            >
              <option value="featured" className="bg-neutral-900 text-white">Featured</option>
              <option value="low-to-high" className="bg-neutral-900 text-white">Price: Low to High</option>
              <option value="high-to-low" className="bg-neutral-900 text-white">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group relative block cursor-pointer"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium tracking-wide text-white group-hover:underline">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-400 font-mono uppercase">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-mono text-neutral-200">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}