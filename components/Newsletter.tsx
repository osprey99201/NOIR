"use client";

import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="border-t border-neutral-800 bg-neutral-950 px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
          Stay Informed
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight uppercase sm:text-5xl">
          Join the Movement
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-neutral-400 font-light">
          Subscribe to receive private access to upcoming drops, editorial content, and exclusive releases.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-md items-center border-b border-white pb-2">
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="w-full bg-transparent text-sm uppercase tracking-wider text-white placeholder-neutral-500 focus:outline-none"
          />
          <button type="submit" aria-label="Subscribe" className="text-white hover:opacity-70 transition-opacity">
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </section>
  );
}