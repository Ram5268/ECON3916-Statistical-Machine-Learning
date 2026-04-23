import Image from "next/image";
/* eslint-disable @next/next/no-img-element */

export default function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex items-center pt-14 overflow-hidden">
      {/* Background image — swap to bg-[url('/hero-bg.jpg')] once you save the file */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
        {/* Text */}
        <div className="space-y-6">
          <p className="text-xs text-gold-400 font-medium tracking-widest uppercase">
            Economics · Data Science · Northeastern University
          </p>
          <h1 className="text-5xl font-bold tracking-tight leading-tight text-white">
            Ryan<br />Martin
          </h1>
          <p className="text-[#a8bdd0] leading-relaxed max-w-md text-sm">
            Economics student at Northeastern University with a focus on data-driven
            analysis and applied econometrics. I use Python, machine learning, and
            visualization tools to turn messy economic data into clear insights.
            Currently exploring the intersection of behavioral economics and
            predictive modeling.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-lg bg-gold-500 text-navy-950 text-sm font-semibold hover:bg-gold-400 transition-colors"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-lg border border-gold-500/40 text-gold-300 text-sm font-medium hover:bg-gold-500/10 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Headshot */}
        <div className="flex justify-center md:justify-end">
          <div className="w-64 h-64 rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl shadow-navy-950/80">
            <Image
              src="/photo.jpg"
              alt="Ryan Martin"
              width={256}
              height={256}
              priority
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 15%",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom fade into body */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-navy-900 to-transparent z-10" />
    </section>
  );
}
