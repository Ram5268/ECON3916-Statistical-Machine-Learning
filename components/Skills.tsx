const skills = [
  { name: "Python",       level: 90, category: "Language" },
  { name: "pandas",       level: 88, category: "Data" },
  { name: "scikit-learn", level: 80, category: "ML" },
  { name: "SQL",          level: 75, category: "Data" },
  { name: "Plotly",       level: 78, category: "Viz" },
  { name: "Git",          level: 82, category: "Tools" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-base">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs text-gold-400 font-medium tracking-widest uppercase mb-2">Toolkit</p>
        <h2 className="text-3xl font-bold tracking-tight text-white">Skills</h2>
        <p className="text-muted mt-1 text-sm">Languages, libraries & tools</p>

        <div className="grid sm:grid-cols-2 gap-4 mt-12">
          {skills.map((s) => (
            <div key={s.name} className="bg-card border border-base rounded-xl p-5 space-y-3 hover:border-gold-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-white">{s.name}</span>
                <span className="text-xs text-muted border border-base rounded-full px-2 py-0.5">
                  {s.category}
                </span>
              </div>
              <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-500 rounded-full"
                  style={{ width: `${s.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
