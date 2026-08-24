"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PRODUCTS = [
  {
    id: "1",
    name: "Oversized Heavyweight Hoodie",
    category: "Outerwear",
    price: "$120",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Architectural Cargo Pants",
    category: "Bottoms",
    price: "$160",
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Boxy Essential Tee",
    category: "Tops",
    price: "$65",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Minimalist Trench Coat",
    category: "Outerwear",
    price: "$280",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-neutral-950 px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
              Curated Selection
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight uppercase sm:text-4xl">
              Featured Drop
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-1 text-sm font-medium uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
          >
            <span>View All Products</span>
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative cursor-pointer"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}