"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useWishlistStore } from "@/store/useWishlistStore";
import { SlidersHorizontal, Heart, Loader2 } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  category: string;
  image: any;
}

const CATEGORIES = ["All", "Outerwear", "Tops", "Bottoms"];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const { toggleWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const query = `*[_type == "product"]{
          _id,
          name,
          slug,
          price,
          category,
          image
        }`;
        const data = await client.fetch(query);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "All") return true;
    return product.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "low-to-high") return a.price - b.price;
    if (sortBy === "high-to-low") return b.price - a.price;
    return 0;
  });

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8">
        <div className="border-b border-neutral-800 pb-8">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
            Archive Collection
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight uppercase sm:text-5xl">
            Live Catalog
          </h1>
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-800 pb-6">
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

        {loading ? (
          <div className="py-24 flex justify-center items-center gap-3 text-neutral-400 font-mono text-xs uppercase">
            <Loader2 className="animate-spin" size={18} />
            <span>Connecting to Sanity CMS...</span>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="py-24 text-center font-mono text-xs text-neutral-500 uppercase">
            No items found in this category.
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => {
              const isFav = isInWishlist(product._id);
              const imageUrl = product.image ? urlFor(product.image).url() : "";

              return (
                <div key={product._id} className="group relative block cursor-pointer">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                    <Link href={`/product/${product._id}`}>
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </Link>
                    <button
                      onClick={() =>
                        toggleWishlist({
                          id: product._id,
                          name: product.name,
                          price: product.price,
                          image: imageUrl,
                          category: product.category,
                        })
                      }
                      aria-label="Toggle Wishlist"
                      className="absolute top-3 right-3 z-10 bg-black/60 p-2.5 backdrop-blur-md text-white transition-colors hover:scale-110"
                    >
                      <Heart
                        size={16}
                        className={isFav ? "fill-red-500 text-red-500" : "text-white"}
                      />
                    </button>
                  </div>

                  <Link href={`/product/${product._id}`} className="mt-4 flex items-start justify-between block">
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
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}