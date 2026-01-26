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



