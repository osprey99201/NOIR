import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 px-6 py-12 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-xs font-mono uppercase text-neutral-500">
          © 2026 NOIR ARCHIVE. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6 text-xs font-mono uppercase text-neutral-400">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/instagram" className="hover:text-white transition-colors">Instagram</Link>
        </div>
      </div>
    </footer>
  );
}