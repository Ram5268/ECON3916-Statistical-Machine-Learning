const projects = [
  {
    id: "lab-6",
    label: "Lab 6",
    title: "Train/Test Split & Sampling Bias on the Titanic Dataset",
    description:
      "Explored manual vs. stratified train/test splitting using the Titanic dataset, examining how sampling strategy affects class distribution balance. Found that stratified splitting (by pclass) eliminates sampling bias that appears in random splits, and validated split integrity using a Chi-Square Sample Ratio Mismatch test.",
    tags: ["scikit-learn", "pandas", "numpy", "seaborn", "scipy"],
    github:
      "https://github.com/Ram5268/ECON3916-Statistical-Machine-Learning/blob/main/Lab/Lab_6.ipynb",
  },
  {
    id: "lab-8",
    label: "Lab 8",
    title: "Causal Inference & Treatment Effects on the LaLonde Dataset",
    description:
      "Analyzed the LaLonde job training experiment to estimate the effect of vocational training on 1978 earnings, using Welch's t-test and a permutation test. Found a statistically significant positive treatment effect, with both methods yielding consistent p-values, confirming the robustness of the result.",
    tags: ["pandas", "numpy", "scipy", "matplotlib", "seaborn"],
    github:
      "https://github.com/Ram5268/ECON3916-Statistical-Machine-Learning/blob/main/Lab/Lab_8.ipynb",
  },
  {
    id: "lab-17",
    label: "Lab 17",
    title: "Predicting Recessions with Logistic Regression (NY Fed Yield Curve Model)",
    description:
      "Replicated the NY Fed's recession prediction model using the 10Y–3M yield spread (lagged 12 months) from FRED, comparing a Linear Probability Model (OLS) to Logistic Regression. Found that the LPM produced out-of-bounds probability predictions, while logistic regression correctly constrained outputs to [0, 1] and better captured the non-linear recession signal.",
    tags: ["scikit-learn", "statsmodels", "pandas", "plotly", "fredapi"],
    github:
      "https://github.com/Ram5268/ECON3916-Statistical-Machine-Learning/blob/main/Lab/lab_17_logistic_regression.ipynb",
  },
  {
    id: "lab-18",
    label: "Lab 18",
    title: "Model Evaluation on Credit Card Fraud Detection",
    description:
      "Applied classification evaluation metrics (confusion matrix, Precision, Recall, F1-Score, ROC-AUC, and Precision-Recall curves) to a highly imbalanced fraud detection dataset (284,807 transactions, 0.172% fraud). Demonstrated the accuracy paradox — a naive 'predict no fraud' baseline hits 99.83% accuracy while catching zero fraud — and showed how threshold tuning shifts the precision-recall tradeoff.",
    tags: ["scikit-learn", "pandas", "numpy", "matplotlib", "seaborn"],
    github:
      "https://github.com/Ram5268/ECON3916-Statistical-Machine-Learning/blob/main/Lab/lab_18_model_evaluation_(1).ipynb",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-base">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs text-gold-400 font-medium tracking-widest uppercase mb-2">Work</p>
        <h2 className="text-3xl font-bold tracking-tight text-white">Projects</h2>
        <p className="text-muted mt-1 text-sm">Data science labs & analysis</p>

        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-card border border-base rounded-2xl p-6 flex flex-col gap-4 hover:border-gold-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-full">
                  {p.label}
                </span>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted hover:text-gold-400 transition-colors underline underline-offset-2"
                >
                  View on GitHub
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-base text-white">{p.title}</h3>
                <p className="text-muted text-sm mt-1 leading-relaxed">{p.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded border border-base text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
