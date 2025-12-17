import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Journal from "@/components/Journal";

export default function Home() {
  return (
    <main className="relative w-full">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Journal />
    </main>
  );
}
