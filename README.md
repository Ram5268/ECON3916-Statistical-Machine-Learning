# ECON 3916: California Housing Value Prediction

**Final project, Spring 2026.** Predicts the median home value of a California
census block group from public demographic and geographic features. Built as a
pre-screening triage tool for a hypothetical real-estate investment trust (REIT)
acquisitions team.

🔗 **Live dashboard:** https://econ3916-statistical-machine-learning-cov7wkxpu4bnnrts79ofnm.streamlit.app/

📄 **Five-page report:** [`report.pdf`](report.pdf)
🧠 **AI methodology appendix:** [`ai_methodology_appendix.pdf`](ai_methodology_appendix.pdf)

---

## What's in this repo

```
.
├── app.py                            # Streamlit dashboard (deployed)
├── 3916-final-notebook.ipynb         # Full analysis pipeline
├── report.pdf                        # 5-page SCR-structure report
├── ai_methodology_appendix.pdf       # P.R.I.M.E. AI documentation
├── requirements.txt                  # Pinned Python dependencies
└── README.md                         # This file
```

The dataset is loaded directly from `sklearn.datasets.fetch_california_housing()`
on first launch — no separate data download needed.

---

## Reproducing the analysis

### 1. Clone and set up

```bash
git clone https://github.com/Ram5268/ECON3916-Statistical-Machine-Learning.git
cd ECON3916-Statistical-Machine-Learning

# Create a virtual environment (recommended)
python3 -m venv .venv
source .venv/bin/activate          # macOS/Linux
# .venv\Scripts\activate           # Windows PowerShell

# Install dependencies
pip install -r requirements.txt
```

### 2. Run the analysis notebook

```bash
jupyter notebook 3916-final-notebook.ipynb
```

Or open it in **Google Colab** (no install needed):
File → Open → GitHub → paste the repo URL → select `3916-final-notebook.ipynb`.
Then `Runtime → Run all`.

The notebook trains three models (Linear Regression, Random Forest, Gradient
Boosting), computes 5-fold CV scores, bootstrap 95% CIs on test metrics, and
generates all figures in the report.

### 3. Run the Streamlit dashboard locally

```bash
streamlit run app.py
```

The first launch trains the Random Forest (~30 sec, cached for the rest of the
session). After that, sliders update predictions instantly.

---

## Reproducibility guarantees

| Source of randomness | Controlled? | How |
|---|---|---|
| `train_test_split` | ✅ | `random_state=42` |
| `RandomForestRegressor` | ✅ | `random_state=42` |
| `GradientBoostingRegressor` | ✅ | `random_state=42` |
| Bootstrap resampling | ✅ | `np.random.default_rng(42)` |
| Permutation importance | ✅ | `random_state=42` |
| Subsample for plots | ✅ | `df.sample(..., random_state=42)` |

Re-running the notebook in any environment with the package versions in
`requirements.txt` should reproduce every reported number to 4 decimal places.

---

## Deployment to Streamlit Community Cloud

1. Push this repo to GitHub (already done).
2. Go to <https://streamlit.io/cloud> → sign in with GitHub.
3. Click **"New app"** → choose this repo, branch `main`, main file `app.py`.
4. Click **"Deploy"**. First build takes 2–5 minutes (installs from
   `requirements.txt`); after that the model retrains on first user visit
   per cloud-instance lifetime (~30 sec, then cached).

The deployed URL is permanent and embedded in this README at the top.

---

## Key results

| Model | Test R² | Test RMSE | 5-fold CV R² |
|---|---|---|---|
| Linear Regression (baseline) | 0.576 | 0.746 (~$74.6k) | 0.612 ± 0.007 |
| **Random Forest (deployed)** | **0.805** | **0.505 (~$50.5k)** | **0.804 ± 0.005** |
| Gradient Boosting | (see notebook) | (see notebook) | (see notebook) |

Bootstrap 95% CIs and full methodology in the notebook and report.

---

## Important caveats

- **Predictive importance only.** Feature importances in the report describe
  statistical association in 1990 California census data, **not causal effects**.
  This model cannot tell you what *would happen* to home values if a
  neighborhood's median income changed.
- **Right-censored target.** `MedHouseVal` is top-coded at \$500,001 in the
  source data. Predictions at or above this level are systematically biased
  downward. The dashboard flags this and recommends human review.
- **1990 data.** For production deployment, retrain on current Census ACS
  5-year tract-level data.

---

## Citation

Pace, R.K. and Barry, R. (1997). "Sparse Spatial Autoregressions."
*Statistics and Probability Letters*, 33: 291–297.

Dataset accessed via:
[`sklearn.datasets.fetch_california_housing`](https://scikit-learn.org/stable/datasets/real_world.html#california-housing-dataset).
Access date: April 26, 2026.

---

## License

MIT — academic project, free to reuse with attribution.
