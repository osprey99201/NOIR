"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchStore } from "@/store/useSearchStore";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Search, X, Loader2 } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: any;
}

export default function SearchModal() {
  const { isOpen, closeSearch } = useSearchStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const groqQuery = `*[_type == "product" && (name match $search || category match $search)]{
          _id,
          name,
          price,
          category,
          image
        }`;
        const data = await client.fetch(groqQuery, { search: `*${query}*` });
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 p-6 rounded-none shadow-2xl relative">
        <div className="flex items-center border-b border-neutral-800 pb-4">
          <Search size={20} className="text-neutral-400 mr-3" />
          <input
            type="text"
            placeholder="SEARCH PRODUCTS OR CATEGORIES..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm font-mono text-white placeholder-neutral-500 focus:outline-none uppercase tracking-wider"
          />
          <button
            onClick={closeSearch}
            className="text-neutral-400 hover:text-white p-1"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="py-8 text-center text-xs font-mono uppercase text-neutral-400 flex justify-center items-center gap-2">
              <Loader2 className="animate-spin" size={16} />
              <span>Searching Archive...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.map((product) => {
                const imageUrl = product.image ? urlFor(product.image).url() : "";
                return (
                  <Link
                    key={product._id}
                    href={`/product/${product._id}`}
                    onClick={closeSearch}
                    className="flex items-center gap-4 p-2 hover:bg-neutral-800/50 transition-colors group"
                  >
                    <div className="relative w-12 h-16 bg-neutral-800 overflow-hidden flex-shrink-0">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-white group-hover:underline">
                        {product.name}
                      </h4>
                      <p className="text-xs font-mono text-neutral-400 uppercase">
                        {product.category}
                      </p>
                    </div>
                    <span className="text-sm font-mono text-neutral-300">
                      ${product.price}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : query.trim() ? (
            <div className="py-8 text-center text-xs font-mono uppercase text-neutral-500">
              No results found for "{query}"
            </div>
          ) : (
            <div className="py-8 text-center text-xs font-mono uppercase text-neutral-600">
              Type to start searching...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}