import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import CollectionBanner from "@/components/CollectionBanner";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <CollectionBanner />
      <Newsletter />
      <Footer />
    </main>
  );
}