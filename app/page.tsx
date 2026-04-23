import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Research from "@/components/Research";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Research />
        <Contact />
      </main>
      <footer className="border-t border-base py-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} Ryan Martin · Economics, Northeastern University
      </footer>
    </>
  );
}
