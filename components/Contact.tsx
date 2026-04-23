import { Mail, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-base">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs text-gold-400 font-medium tracking-widest uppercase mb-2">Connect</p>
        <h2 className="text-3xl font-bold tracking-tight text-white">Contact</h2>
        <p className="text-muted mt-1 text-sm max-w-md">
          Open to internships, research collaborations, and data science opportunities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <a
            href="mailto:martin.ryan1@northeastern.edu"
            className="flex items-center gap-3 bg-card border border-base rounded-xl px-6 py-4 hover:border-gold-500/40 transition-colors group"
          >
            <Mail size={18} className="text-gold-400" />
            <div>
              <p className="text-xs text-muted">Email</p>
              <p className="text-sm font-medium text-white group-hover:text-gold-400 transition-colors">
                martin.ryan1@northeastern.edu
              </p>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/ryan-martin5268/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-card border border-base rounded-xl px-6 py-4 hover:border-gold-500/40 transition-colors group"
          >
            <Linkedin size={18} className="text-gold-400" />
            <div>
              <p className="text-xs text-muted">LinkedIn</p>
              <p className="text-sm font-medium text-white group-hover:text-gold-400 transition-colors">
                ryan-martin5268
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
