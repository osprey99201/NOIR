"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart, Loader2 } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: any;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const query = `*[_type == "product"][0..5]{
          _id,
          name,
          price,
          category,
          image
        }`;
        const data = await client.fetch(query);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  return (
    <section className="py-24 bg-neutral-950 text-white border-t border-neutral-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
              Curated Selection
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight uppercase sm:text-4xl">
              Featured Items
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:block text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors underline underline-offset-8"
          >
            View All Products
          </Link>
        </div>

        {loading ? (
          <div className="py-16 flex justify-center items-center gap-3 text-neutral-400 font-mono text-xs uppercase">
            <Loader2 className="animate-spin" size={18} />
            <span>Fetching Live Collection...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center font-mono text-xs text-neutral-500 uppercase">
            No products available.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const isFav = isInWishlist(product._id);
              const imageUrl = product.image ? urlFor(product.image).url() : "";

              return (
                <div key={product._id} className="group relative">
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

        <div className="mt-12 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-block text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white underline underline-offset-8"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}