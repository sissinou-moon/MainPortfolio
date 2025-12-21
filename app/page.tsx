import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Connect from "@/components/Connect";

export default function Home() {
  return (
    <main className="relative w-full">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Connect />
      <div className="h-[100px] bg-white"></div>
    </main>
  );
}
