"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-screen flex items-end justify-start bg-neutral-950 text-white overflow-hidden pt-20">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop"
          alt="Noir Archive Hero Collection"
          fill
          priority
          className="object-cover object-center brightness-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 sm:pb-24 pt-32 w-full">
        <div className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-300 mb-3">
            AUTUMN / WINTER 2026
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight leading-[0.95]">
            THE NEW <br />
            STANDARD.
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-md">
            Refined architectural essentials designed for modern movement and longevity.
          </p>

          <div className="mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs font-mono uppercase tracking-widest font-bold hover:bg-neutral-200 transition-all group"
            >
              <span>SHOP COLLECTION</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}