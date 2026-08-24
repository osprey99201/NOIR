"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    title: "Outerwear",
    subtitle: "Jackets & Coats",
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop",
    href: "/shop?category=outerwear",
  },
  {
    title: "Tops & Hoodies",
    subtitle: "Heavyweight Essentials",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop",
    href: "/shop?category=tops",
  },
  {
    title: "Bottoms",
    subtitle: "Architectural Cargo",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800&auto=format&fit=crop",
    href: "/shop?category=bottoms",
  },
];

export default function CollectionBanner() {
  return (
    <section className="bg-neutral-950 px-6 py-12 text-white lg:px-8">
      <div className="mx-auto max-w-7xl border-t border-neutral-800 pt-16">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
          Categories
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight uppercase sm:text-4xl mb-12">
          Explore Collections
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={category.href} className="group relative block h-[450px] overflow-hidden bg-neutral-900">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    {category.subtitle}
                  </p>
                  <h3 className="text-2xl font-semibold uppercase tracking-wide text-white mt-1">
                    {category.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}