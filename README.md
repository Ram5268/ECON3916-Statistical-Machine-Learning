# 📊 Economic Data Science Portfolio

Welcome! This repository showcases my journey in **ECON 3916: Statistical & Machine Learning for Economics**, where I'm learning to bridge the gap between traditional economic theory and modern data science techniques.

## About This Portfolio

As an economics student passionate about data-driven decision making, I'm building skills that combine **causal inference** with **predictive analytics**. This repository documents my exploration of how foundational statistical concepts scale into powerful machine learning applications.

The course follows a **"Concept Extension" approach**: we start with core econometric principles (like regression analysis) and extend them using ML algorithms (like Lasso, Ridge, and ensemble methods). This framework helps me understand not just *how* to apply these tools, but *when* and *why* they're appropriate for economic questions.

Through hands-on labs and projects, I'm developing the technical skills and economic intuition needed for roles in **data analysis, economic consulting, and finance**.

## 🛠️ Tech Stack

This portfolio leverages modern tools for economic data analysis:

- **Python** 🐍 – Core programming language for analysis and modeling
- **Pandas** – Data manipulation and cleaning
- **Scikit-Learn** – Machine learning implementations
- **Statsmodels** – Econometric modeling and statistical tests
- **Google Colab** – Cloud-based development environment

## 📂 Repository Structure

- Ongoing

- `labs/` – Weekly lab assignments applying statistical and ML concepts
- `projects/` – Larger projects integrating multiple techniques
- `notes/` – Key insights and methodology documentation

## 🎯 What I'm Learning

- Scaling traditional econometric methods with machine learning
- Balancing prediction accuracy with causal interpretation
- Applying regularization techniques to economic data
- Model selection and validation in real-world contexts

---

*This repository is actively maintained as I progress through the course. Feel free to explore, and don't hesitate to reach out if you'd like to discuss economics, data science, or potential opportunities!*

# The Illusion of Growth & the Composition Effect  
**Deflating History with FRED**

## Objective  
This project investigates long-run U.S. wage stagnation by correcting nominal wage data for inflation and labor-force composition bias. Using live macroeconomic data from the Federal Reserve Economic Data (FRED) API, the analysis demonstrates how apparent wage growth can be misleading when inflation and workforce composition are ignored. The project culminates in identifying and correcting the *Pandemic Wage Paradox*—the illusion of rising wages during 2020.

## Methodology  

### Data Ingestion & API Usage  
A Python data pipeline was built to ingest and process real-time macroeconomic data from the FRED API using `fredapi`. The analysis relies on three primary datasets:

- **Average Hourly Earnings of Production and Nonsupervisory Employees (AHETPI)** — nominal wage series  
- **Consumer Price Index (CPI)** — inflation adjustment  
- **Employment Cost Index (ECI)** — composition-adjusted labor cost metric  

### Inflation Adjustment (Deflating Wages)  
Nominal wages were converted into **real wages** by deflating the AHETPI series with CPI data. This removes the *money illusion*—the tendency to mistake nominal wage increases for real purchasing power gains.

### Detecting the Pandemic Anomaly  
Time-series analysis revealed a sharp spike in real wages during 2020. Rather than interpreting this as genuine wage growth, the project hypothesized a **composition effect** caused by pandemic-era labor force disruption.

### Composition Effect Correction  
To test this hypothesis, the Employment Cost Index (ECI) was introduced as a control variable. Unlike average wage measures, ECI adjusts for changes in workforce composition. Comparing CPI-deflated wages against ECI trends isolates whether observed wage growth reflects true labor demand or a statistical artifact.

## Key Findings  

### The Money Illusion  
After adjusting for inflation, real wages for U.S. workers remain largely **flat over the past 50 years**, despite substantial nominal wage growth. This visualization highlights how inflation obscures stagnation in real purchasing power.

### The Pandemic Paradox  
The apparent wage boom in 2020 was not driven by increased labor productivity or demand. Instead:

- Low-wage workers disproportionately exited the labor force  
- The remaining workforce skewed higher-income  
- Average wages mechanically increased despite no real improvement in compensation  

The ECI series shows **no corresponding spike**, confirming that the 2020 wage surge was a **statistical artifact**, not a real increase in labor demand.


import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# -----------------------------
# Optional: ensure time index
# -----------------------------
# If you have a date column (uncomment + edit as needed):
# df_gtm["Date"] = pd.to_datetime(df_gtm["Date"])
# df_gtm = df_gtm.sort_values("Date").set_index("Date")

# If it's already indexed by date/time, just ensure sorted:
df_gtm = df_gtm.sort_index()

# -----------------------------
# Styling
# -----------------------------
plt.style.use("dark_background")
sns.set_theme(style="dark")  # works fine with dark_background

fig, axes = plt.subplots(2, 3, figsize=(18, 10))
fig.suptitle("Mexico Economic Snapshot", fontsize=20, fontweight="bold", y=0.98)

x = df_gtm.index

# -----------------------------
# 1) Top Left: Real GDP (Line)
# -----------------------------
ax = axes[0, 0]
ax.plot(x, df_gtm["GDP_Const"], linewidth=2)
ax.set_title("Real GDP (Constant Prices)")
ax.set_xlabel("")
ax.set_ylabel("")
ax.grid(alpha=0.2)

# -----------------------------
# 2) Top Middle: Inflation (Bar) + 0 line
# -----------------------------
ax = axes[0, 1]
ax.bar(x, df_gtm["Inflation_CPI"])
ax.axhline(0, linewidth=1.5, alpha=0.9)
ax.set_title("Inflation Rate (CPI)")
ax.set_xlabel("")
ax.set_ylabel("")
ax.grid(axis="y", alpha=0.2)

# -----------------------------
# 3) Top Right: Unemployment (Line)
# -----------------------------
ax = axes[0, 2]
ax.plot(x, df_gtm["Unemployment_Rate"], linewidth=2)
ax.set_title("Unemployment Rate")
ax.set_xlabel("")
ax.set_ylabel("")
ax.grid(alpha=0.2)

# -----------------------------
# 4) Bottom Left: Fiscal Balance (Fill between Tax Rev and Gov Exp)
# -----------------------------
ax = axes[1, 0]
tax = df_gtm["Tax_Rev_GDP"]
gov = df_gtm["Gov_Exp_GDP"]

ax.plot(x, tax, linewidth=1.8, label="Tax Revenue (% GDP)")
ax.plot(x, gov, linewidth=1.8, label="Gov Expenditure (% GDP)")

# Fill where tax >= gov vs where gov > tax
ax.fill_between(x, tax, gov, where=(tax >= gov), interpolate=True, alpha=0.25, label="Surplus")
ax.fill_between(x, tax, gov, where=(tax < gov), interpolate=True, alpha=0.25, label="Deficit")

ax.set_title("Fiscal Balance: Revenue vs Spending")
ax.set_xlabel("")
ax.set_ylabel("")
ax.grid(alpha=0.2)
ax.legend(fontsize=9, loc="best", frameon=False)

# -----------------------------
# 5) Bottom Middle: Trade Balance (Fill between Exports and Imports)
# -----------------------------
ax = axes[1, 1]
exp = df_gtm["Exports_GDP"]
imp = df_gtm["Imports_GDP"]

ax.plot(x, exp, linewidth=1.8, label="Exports (% GDP)")
ax.plot(x, imp, linewidth=1.8, label="Imports (% GDP)")

ax.fill_between(x, exp, imp, where=(exp >= imp), interpolate=True, alpha=0.25, label="Trade Surplus")
ax.fill_between(x, exp, imp, where=(exp < imp), interpolate=True, alpha=0.25, label="Trade Deficit")

ax.set_title("Trade Balance: Exports vs Imports")
ax.set_xlabel("")
ax.set_ylabel("")
ax.grid(alpha=0.2)
ax.legend(fontsize=9, loc="best", frameon=False)

# -----------------------------
# 6) Bottom Right: Savings vs Investment (Dual lines)
# -----------------------------
ax = axes[1, 2]
ax.plot(x, df_gtm["Gross_Dom_Savings"], linewidth=2, label="Gross Domestic Savings")
ax.plot(x, df_gtm["Gross_Cap_Formation"], linewidth=2, label="Gross Capital Formation (Investment)")
ax.set_title("Savings vs Investment")
ax.set_xlabel("")
ax.set_ylabel("")
ax.grid(alpha=0.2)
ax.legend(fontsize=9, loc="best", frameon=False)

# -----------------------------
# Final formatting
# -----------------------------
for ax in axes.flat:
    ax.tick_params(axis="x", rotation=30)

plt.tight_layout(rect=[0, 0, 1, 0.95])
plt.show()
