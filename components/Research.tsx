const interests = [
  {
    title: "Causal Inference in Labor & Capital Markets",
    body: "My interest in causal inference stems from both academic and professional experience. Through coursework in statistical machine learning, I worked directly with the LaLonde experimental dataset to estimate the causal effect of job training on earnings, applying Welch's t-test and permutation testing to validate treatment effects under uncertainty. This mirrors challenges I encounter in private equity, where isolating the true driver of asset performance — whether a value-add renovation, a market cycle, or an operational change — requires thinking carefully about attribution and counterfactuals.",
  },
  {
    title: "Predictive Modeling for Macroeconomic Signals",
    body: "My second area of interest is macroeconomic forecasting, particularly the use of financial market signals to anticipate turning points in the business cycle. I replicated the NY Fed's yield curve recession model using logistic regression, comparing it against a linear probability model and demonstrating why probabilistic, bounded predictions matter when the outcome is binary. This connects directly to my work at Parceros Capital, where reading macro conditions is part of evaluating acquisition timing and capital deployment strategy.",
  },
  {
    title: "Model Evaluation & Decision-Making Under Class Imbalance",
    body: "I am interested in model evaluation and decision-making under class imbalance — a problem that appears in both fraud detection and deal sourcing. Through lab work on the Kaggle credit card fraud dataset, I built intuition around precision-recall tradeoffs, ROC-AUC, and threshold optimization, recognizing that optimizing for raw accuracy is often the wrong objective when the cost of a missed signal is asymmetric.",
  },
];

const methods = [
  "Statistical Machine Learning", "Econometrics", "Financial Modeling",
  "Logistic Regression", "OLS", "Permutation Testing", "Stratified Sampling",
  "Confusion Matrix Analysis", "ROC / Precision-Recall Curves",
  "IRR & Cash-on-Cash Analysis", "Sensitivity Modeling",
  "scikit-learn", "pandas", "statsmodels", "Plotly",
];

export default function Research() {
  return (
    <section id="research" className="py-24 border-t border-base">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs text-gold-400 font-medium tracking-widest uppercase mb-2">Academia</p>
        <h2 className="text-3xl font-bold tracking-tight text-white">Research Interests</h2>
        <p className="text-muted mt-1 text-sm max-w-2xl">
          I am drawn to the intersection of empirical economics, financial markets, and machine
          learning — areas where rigorous quantitative methods meet real-world investment and
          policy decisions.
        </p>

        {/* Three interest cards */}
        <div className="grid sm:grid-cols-3 gap-5 mt-12">
          {interests.map((item, i) => (
            <div key={i} className="bg-card border border-base rounded-2xl p-6 flex flex-col gap-3 hover:border-gold-500/40 transition-colors">
              <span className="text-xs font-medium text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-full self-start">
                0{i + 1}
              </span>
              <h3 className="font-semibold text-white text-sm leading-snug">{item.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Coursework & methods */}
        <div className="mt-10 bg-card border border-base rounded-2xl p-6">
          <p className="text-xs font-medium text-gold-400 uppercase tracking-widest mb-4">
            Relevant Coursework &amp; Methods
          </p>
          <div className="flex flex-wrap gap-2">
            {methods.map((m) => (
              <span key={m} className="text-xs px-3 py-1 rounded-full border border-base text-muted hover:border-gold-500/40 hover:text-gold-300 transition-colors">
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Currently building */}
        <div className="mt-5 bg-card border border-base rounded-2xl p-6 space-y-2 hover:border-gold-500/40 transition-colors">
          <p className="text-xs font-medium text-gold-400 uppercase tracking-widest">
            What I Am Working On
          </p>
          <p className="text-sm text-muted leading-relaxed">
            I am currently building an AI-driven real estate analytics platform designed to
            automate deal sourcing, due diligence, and portfolio performance tracking for NYC
            residential assets. The platform draws on the same classification and evaluation
            frameworks I have studied academically, applying them to a live investment context
            where signal quality directly affects capital allocation decisions. Alongside this,
            I am completing a Private Equity certification through Wharton &amp; Wall Street Prep
            and will be consulting with LTCware, a Series A funded South Korean crypto startup
            working to revolutionize digital transactions — giving me hands-on exposure to
            early-stage venture strategy and international market dynamics.
          </p>
        </div>
      </div>
    </section>
  );
}
