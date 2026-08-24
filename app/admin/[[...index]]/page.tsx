"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { ArrowLeft, Plus, Minus, Check, ShieldCheck, Truck, Heart, Loader2 } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  sizes: string[];
  image: any;
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchSingleProduct() {
      try {
        const query = `*[_type == "product" && _id == $id][0]{
          _id,
          name,
          price,
          category,
          description,
          sizes,
          image
        }`;
        const data = await client.fetch(query, { id: productId });
        setProduct(data);
        if (data?.sizes?.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchSingleProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center font-mono text-xs uppercase gap-3">
        <Loader2 className="animate-spin" size={18} />
        <span>Loading Product Details...</span>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white">
        <Navbar />
        <div className="mx-auto max-w-xl px-6 pt-36 text-center">
          <p className="text-xs font-mono uppercase text-neutral-400 mb-4">Product Not Found</p>
          <Link href="/shop" className="underline font-mono text-xs uppercase">Return to Shop</Link>
        </div>
      </main>
    );
  }

  const imageUrl = product.image ? urlFor(product.image).url() : "";
  const isFavorited = isInWishlist(product._id);

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: imageUrl,
      size: selectedSize || "Standard",
      quantity: quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          <span>Back to catalog</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 border border-neutral-800">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-mono text-white">
              ${product.price}
            </p>

            <p className="mt-6 text-sm text-neutral-400 leading-relaxed font-light">
              {product.description || "No description provided."}
            </p>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-8">
                <div className="flex justify-between items-center text-xs font-mono uppercase text-neutral-400 mb-3">
                  <span>Select Size</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs font-mono uppercase border transition-all ${
                        selectedSize === size
                          ? "border-white bg-white text-black font-bold"
                          : "border-neutral-800 text-neutral-300 hover:border-neutral-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <p className="text-xs font-mono uppercase text-neutral-400 mb-3">
                Quantity
              </p>
              <div className="flex items-center w-36 border border-neutral-800 text-xs font-mono">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="flex-1 text-center py-3">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 text-xs font-mono uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-black hover:bg-neutral-200"
                }`}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>
                    Add to Bag — ${(product.price * quantity).toFixed(2)}
                  </span>
                )}
              </button>

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
                aria-label="Save to Wishlist"
                className={`px-5 border transition-colors flex items-center justify-center ${
                  isFavorited
                    ? "border-red-600 bg-red-600/10 text-red-500"
                    : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white"
                }`}
              >
                <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-neutral-800 pt-8 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-neutral-300" />
                <span>Express Worldwide Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-neutral-300" />
                <span>Authenticity Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}