"""
ECON 3916 — California Housing Prediction Dashboard
Streamlit Community Cloud deployment.

Run locally:  streamlit run app.py
"""
import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import fetch_california_housing
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

RANDOM_STATE = 42

# ============================================================
# Page config
# ============================================================
st.set_page_config(
    page_title="California Housing Prediction",
    page_icon="🏠",
    layout="wide",
)

# ============================================================
# Cached: load data + train model exactly once per session
# ============================================================
@st.cache_data
def load_data():
    """Load California Housing into a DataFrame."""
    data = fetch_california_housing(as_frame=True)
    return data.frame

@st.cache_resource
def train_model(df):
    """Train Random Forest. Cached as a 'resource' (lives across reruns)."""
    X = df.drop(columns=["MedHouseVal"])
    y = df["MedHouseVal"]
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=RANDOM_STATE
    )
    rf = RandomForestRegressor(
        n_estimators=100, random_state=RANDOM_STATE, n_jobs=-1
    )
    rf.fit(X_train, y_train)
    return rf, X, X_test, y_test

# ============================================================
# Header
# ============================================================
st.title("🏠 California Block-Group Housing Value Predictor")
st.markdown(
    """
    Predict the **median home value** of a California census block group
    from public demographic and geographic features.

    > **Stakeholder:** mid-size California REIT acquisitions team — uses this
    > tool to *pre-screen* candidate block groups before commissioning full appraisals.
    > **This is a screening tool, not a pricing tool.**

    *Data: California Housing (Pace & Barry, 1997), 20,640 block groups, 1990 Census.
    Model: Random Forest, 100 trees. Trained on first launch (~30 sec).*
    """
)

# ============================================================
# Load + train (with spinner on first call)
# ============================================================
with st.spinner("Loading data and training model on first run..."):
    df = load_data()
    rf, X, X_test, y_test = train_model(df)

# Feature ranges + medians for sliders
medians = X.median()
mins    = X.min()
maxs    = X.max()

# ============================================================
# Sidebar: 8 input sliders
# ============================================================
st.sidebar.header("📍 Block-group inputs")
st.sidebar.markdown("Adjust to describe the block group you want to evaluate.")

med_inc = st.sidebar.slider(
    "Median income (tens of thousands $)", float(mins["MedInc"]),
    float(maxs["MedInc"]), float(medians["MedInc"]), step=0.1,
    help="e.g. 4.5 = $45,000 median household income",
)
house_age = st.sidebar.slider(
    "Median house age (years)", float(mins["HouseAge"]),
    float(maxs["HouseAge"]), float(medians["HouseAge"]), step=1.0,
    help="Top-coded at 52 in the source data.",
)
ave_rooms = st.sidebar.slider(
    "Average rooms per household", 1.0, 15.0,
    float(medians["AveRooms"]), step=0.1,
    help="Cropped slider; raw data tail extends to ~142 (low-pop block groups).",
)
ave_bedrms = st.sidebar.slider(
    "Average bedrooms per household", 0.5, 5.0,
    float(medians["AveBedrms"]), step=0.1,
)
population = st.sidebar.slider(
    "Block-group population", int(mins["Population"]),
    int(maxs["Population"]), int(medians["Population"]), step=50,
)
ave_occup = st.sidebar.slider(
    "Average household occupancy", 1.0, 10.0,
    float(medians["AveOccup"]), step=0.1,
    help="Cropped slider; raw data tail extends to ~1243.",
)
latitude = st.sidebar.slider(
    "Latitude (32.5 = far south, 42.0 = far north)",
    float(mins["Latitude"]), float(maxs["Latitude"]),
    float(medians["Latitude"]), step=0.01,
)
longitude = st.sidebar.slider(
    "Longitude (-124 = coast, -114 = SE corner)",
    float(mins["Longitude"]), float(maxs["Longitude"]),
    float(medians["Longitude"]), step=0.01,
)

# ============================================================
# Build input vector and predict
# ============================================================
input_df = pd.DataFrame(
    [{
        "MedInc": med_inc, "HouseAge": house_age, "AveRooms": ave_rooms,
        "AveBedrms": ave_bedrms, "Population": population,
        "AveOccup": ave_occup, "Latitude": latitude, "Longitude": longitude,
    }]
)

# Point estimate
point_pred = rf.predict(input_df)[0]

# Prediction interval from per-tree predictions
# Convert to numpy to avoid sklearn feature-name warnings on individual trees
input_arr = input_df.values
tree_preds = np.array([t.predict(input_arr)[0] for t in rf.estimators_])
pi_low = np.percentile(tree_preds, 5)
pi_high = np.percentile(tree_preds, 95)
pi_std = tree_preds.std()

# ============================================================
# Main panel: predictions + interactive map
# ============================================================
left, right = st.columns([1, 1.3])

with left:
    st.subheader("🎯 Prediction")

    st.metric(
        "Point estimate (median home value)",
        f"${point_pred * 100_000:,.0f}",
        help="Random Forest mean prediction",
    )

    st.markdown(
        f"""
        **90% prediction interval:**
        **\\${pi_low * 100_000:,.0f}** to **\\${pi_high * 100_000:,.0f}**

        *Width:* \\${(pi_high - pi_low) * 100_000:,.0f}
        *Across-tree std dev:* \\${pi_std * 100_000:,.0f}
        """
    )

    # Triage flag
    if pi_high >= 5.0:
        st.warning(
            "⚠️ **Triage flag — route to human appraiser.** "
            "The 90% prediction interval extends to or above the \\$500k "
            "training-data ceiling. The model under-predicts in this region."
        )
    elif point_pred >= 4.5:
        st.info(
            "ℹ️ **Near ceiling.** Point estimate within \\$50k of the censored "
            "\\$500k cap; consider human review."
        )
    else:
        st.success("✅ Prediction in well-supported region of training data.")

    with st.expander("ℹ️ How this works (uncertainty methodology)"):
        st.markdown(
            """
            The Random Forest contains 100 decision trees. Each tree gives an
            independent prediction for your input. We take the **mean** as the
            point estimate and the **5th and 95th percentiles** across trees as
            the 90% prediction interval.

            **What this PI captures:** disagreement among trees — a proxy for
            how much the model "knows" about this kind of input.
            **What it does NOT capture:** irreducible noise in the target
            (especially the right-censoring at \\$500,001).

            For a more conservative bound on premium markets, treat any PI
            extending above \\$500k as "send to appraiser."
            """
        )

with right:
    st.subheader("🗺️ Where on the map?")

    fig, ax = plt.subplots(figsize=(8, 8))
    sample = df.sample(n=5000, random_state=RANDOM_STATE)
    sc = ax.scatter(
        sample["Longitude"], sample["Latitude"],
        c=sample["MedHouseVal"], cmap="viridis",
        s=sample["Population"] / 100, alpha=0.4, edgecolor="none",
    )
    plt.colorbar(sc, ax=ax, label="Median value ($100k)")

    # User's point as a red star
    ax.scatter(
        [longitude], [latitude],
        color="red", marker="*", s=600,
        edgecolor="white", linewidth=2, zorder=10,
        label="Your input",
    )
    ax.set_xlabel("Longitude")
    ax.set_ylabel("Latitude")
    ax.set_title("Your block group on the California map")
    ax.legend(loc="upper right")
    ax.annotate(
        "Bay Area", xy=(-122.4, 37.8), xytext=(-124, 39),
        arrowprops=dict(arrowstyle="->", color="black"), fontsize=9,
    )
    ax.annotate(
        "Los Angeles", xy=(-118.2, 34.0), xytext=(-121, 33),
        arrowprops=dict(arrowstyle="->", color="black"), fontsize=9,
    )
    plt.tight_layout()
    st.pyplot(fig)

# ============================================================
# Sanity-check section (optional collapsible)
# ============================================================
with st.expander("📊 Model performance (held-out test set)"):
    yhat_test = rf.predict(X_test)
    from sklearn.metrics import r2_score, mean_squared_error
    test_r2 = r2_score(y_test, yhat_test)
    test_rmse = float(np.sqrt(mean_squared_error(y_test, yhat_test)))

    c1, c2, c3 = st.columns(3)
    c1.metric("Test R²", f"{test_r2:.3f}")
    c2.metric("Test RMSE", f"${test_rmse * 100_000:,.0f}")
    c3.metric("Training rows", f"{len(df) - len(X_test):,}")

    st.caption(
        "Random Forest, 100 trees, train_test_split with `random_state=42`. "
        "See the analysis notebook on GitHub for full methodology, "
        "5-fold CV results, and bootstrap confidence intervals on these metrics."
    )

# ============================================================
# Footer disclaimers
# ============================================================
st.markdown("---")
st.caption(
    "**Predictive importance only — not causal.** Feature relationships shown "
    "by this model describe statistical association in 1990 California census "
    "data, not causal effects. Predictions near or above \\$500,001 are "
    "downward-biased due to top-coding in the source data and should be "
    "reviewed by a human appraiser. ECON 3916 final project, Spring 2026."
)
