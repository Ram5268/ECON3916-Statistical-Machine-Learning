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

# Ensure time-ordered data
df_gtm = df_gtm.sort_index()

# -----------------------------
# Styling
# -----------------------------
plt.style.use("dark_background")
sns.set_theme(style="dark")

fig, axes = plt.subplots(2, 3, figsize=(18, 10))
fig.suptitle("Mexico Economic Snapshot", fontsize=20, fontweight="bold", y=0.98)

x = df_gtm.index

# -----------------------------
# Top Row
# -----------------------------
axes[0, 0].plot(x, df_gtm["GDP_Const"], linewidth=2)
axes[0, 0].set_title("Real GDP (Constant Prices)")
axes[0, 0].grid(alpha=0.2)

axes[0, 1].bar(x, df_gtm["Inflation_CPI"])
axes[0, 1].axhline(0, linewidth=1.5)
axes[0, 1].set_title("Inflation Rate (CPI)")
axes[0, 1].grid(axis="y", alpha=0.2)

axes[0, 2].plot(x, df_gtm["Unemployment_Rate"], linewidth=2)
axes[0, 2].set_title("Unemployment Rate")
axes[0, 2].grid(alpha=0.2)

# -----------------------------
# Bottom Row
# -----------------------------
tax = df_gtm["Tax_Rev_GDP"]
gov = df_gtm["Gov_Exp_GDP"]

axes[1, 0].plot(x, tax, label="Tax Revenue (% GDP)")
axes[1, 0].plot(x, gov, label="Gov Expenditure (% GDP)")
axes[1, 0].fill_between(x, tax, gov, where=(tax >= gov), alpha=0.25)
axes[1, 0].fill_between(x, tax, gov, where=(tax < gov), alpha=0.25)
axes[1, 0].set_title("Fiscal Balance")
axes[1, 0].legend(frameon=False)
axes[1, 0].grid(alpha=0.2)

exp = df_gtm["Exports_GDP"]
imp = df_gtm["Imports_GDP"]

axes[1, 1].plot(x, exp, label="Exports (% GDP)")
axes[1, 1].plot(x, imp, label="Imports (% GDP)")
axes[1, 1].fill_between(x, exp, imp, where=(exp >= imp), alpha=0.25)
axes[1, 1].fill_between(x, exp, imp, where=(exp < imp), alpha=0.25)
axes[1, 1].set_title("Trade Balance")
axes[1, 1].legend(frameon=False)
axes[1, 1].grid(alpha=0.2)

axes[1, 2].plot(x, df_gtm["Gross_Dom_Savings"], label="Savings")
axes[1, 2].plot(x, df_gtm["Gross_Cap_Formation"], label="Investment")
axes[1, 2].set_title("Savings vs Investment")
axes[1, 2].legend(frameon=False)
axes[1, 2].grid(alpha=0.2)

# -----------------------------
# Final Layout
# -----------------------------
for ax in axes.flat:
    ax.tick_params(axis="x", rotation=30)

plt.tight_layout(rect=[0, 0, 1, 0.95])
plt.show()

The Cost of Living Crisis: A Data-Driven Analysis
The Problem: Why the “Average” CPI Fails Students

The official Consumer Price Index (CPI) is designed to measure inflation for an “average” household. However, this average obscures substantial variation in cost pressures across different demographic groups. For college students living in high-cost urban areas like Boston, spending patterns are heavily concentrated in tuition, rent, and food away from home—categories that have historically outpaced headline inflation.

As a result, national CPI trends often understate the real cost-of-living pressures faced by students. This project investigates whether the official CPI meaningfully captures student inflation—or whether it systematically masks localized and demographic-specific pain.

Methodology: Python, APIs, and Index Theory

I constructed a custom Student Spending Price Index (Student SPI) using Python and publicly available economic data from the Federal Reserve Economic Data (FRED) API.

The analysis follows a Laspeyres-style index framework, holding expenditure weights constant to isolate price changes over time. Key methodological steps include:

Manually defining a student consumption basket (tuition, rent, food away from home, streaming services).

Fetching official CPI component series via the FRED API.

Normalizing all series to a common base year (2016 = 100) to resolve base-year distortions and enable valid comparison.

Applying student-specific expenditure weights to generate a weighted Student SPI.

Extending the analysis geographically by incorporating Boston–Cambridge–Newton CPI data to compare national, regional, and student-specific inflation trends.

Visualizing divergence using Matplotlib, including shaded “inflation gaps” to highlight differences over time.

This approach transforms CPI from a static statistic into a flexible analytical tool tailored to specific populations.

Key Findings

My analysis reveals a significant divergence between student cost inflation and national CPI, with the Student SPI rising approximately 30–40% more than the official CPI since 2016, depending on weighting assumptions.

Additionally, regional analysis shows that Boston-area inflation consistently exceeds the national average, further compounding financial pressure on students in high-cost cities. The combined effect of demographic spending concentration and local price dynamics explains why students often experience inflation as worsening—even during periods when national CPI growth appears to moderate.

Overall, this project demonstrates that inflation is not a single number but a distributional phenomenon, and that meaningful economic analysis requires tailoring metrics to the populations they aim to represent.
