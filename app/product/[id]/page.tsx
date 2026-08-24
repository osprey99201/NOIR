"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { ArrowLeft, Plus, Minus, Check, ShieldCheck, Truck, Heart } from "lucide-react";

const PRODUCTS_DATA = [
  {
    id: "1",
    name: "Oversized Heavyweight Hoodie",
    category: "Outerwear",
    price: 120,
    description:
      "Engineered from 500GSM custom loopback organic cotton. Features dropped shoulders, a double-layer hood without drawstrings for a clean architectural silhouette, and deep ribbed cuffs.",
    details: [
      "100% Organic Heavyweight Cotton",
      "Pre-shrunk fabric",
      "Made in Portugal",
      "Model is 6'1 wearing size L",
    ],
    sizes: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Architectural Cargo Pants",
    category: "Bottoms",
    price: 160,
    description:
      "Constructed from high-density Japanese cotton twill. Features structured knee pleating, deep utilitarian 3D side pockets, and adjustable hem drawstrings for customized taper.",
    details: [
      "Japanese Cotton Twill",
      "YKK Zippers throughout",
      "Relaxed tapered fit",
      "Water-resistant coating",
    ],
    sizes: ["30", "32", "34", "36"],
    image:
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Boxy Essential Tee",
    category: "Tops",
    price: 65,
    description:
      "A refined foundation piece cut from 280GSM combed cotton jersey. Cut wide through the chest with a tight high-rib collar that maintains shape over time.",
    details: [
      "280GSM Heavy Cotton Jersey",
      "Reinforced crew neck collar",
      "Standard boxy drape",
      "Custom pigment dyed",
    ],
    sizes: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Minimalist Trench Coat",
    category: "Outerwear",
    price: 280,
    description:
      "A minimalist take on modern outerwear. Tailored with clean concealed button plackets, structured shoulders, and an extended drop hem.",
    details: [
      "Wool Blend Twill",
      "Full interior satin lining",
      "Internal welt pockets",
      "Dry clean only",
    ],
    sizes: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop",
  },
];

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const product =
    PRODUCTS_DATA.find((p) => p.id === productId) || PRODUCTS_DATA[0];

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
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
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
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
              {product.description}
            </p>

            <div className="mt-8">
              <div className="flex justify-between items-center text-xs font-mono uppercase text-neutral-400 mb-3">
                <span>Select Size</span>
                <span className="underline cursor-pointer hover:text-white">
                  Size Guide
                </span>
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

            {/* Action Row: Add to Bag + Wishlist Button */}
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
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
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

            <div className="mt-12 border-t border-neutral-800 pt-8 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Specifications & Fit
              </h3>
              <ul className="space-y-2 text-xs text-neutral-300 font-mono">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1 w-1 bg-white rounded-full" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-neutral-800 pt-8 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-neutral-300" />
                <span>Express Worldwide Delivery</span>
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