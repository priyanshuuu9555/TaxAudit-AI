import joblib
import pandas as pd
import shap

# Load trained XGBoost model
model = joblib.load("ml/models/xgboost.pkl")

# Load scaler
scaler = joblib.load("ml/models/scaler.pkl")

# Feature names
features = [
    "total_income",
    "total_deductions",
    "refund_claimed",
    "gst_turnover",
    "compliance_score",
    "deduction_ratio",
    "refund_ratio",
]


def explain_prediction(taxpayer):
    """
    Generate SHAP feature contributions
    for one taxpayer.
    """

    data = pd.DataFrame(
        [taxpayer],
        columns=features
    )

    data_scaled = scaler.transform(data)

    explainer = shap.TreeExplainer(model)

    shap_values = explainer.shap_values(data_scaled)

    # XGBoost binary classification
    if isinstance(shap_values, list):
        values = shap_values[1][0]
    else:
        values = shap_values[0]

    explanation = []

    for feature, value, shap_value in zip(
        features,
        data.iloc[0],
        values
    ):
        explanation.append({
            "feature": feature,
            "value": round(float(value), 4),
            "contribution": round(float(shap_value), 4),
        })

    # Highest impact first
    explanation.sort(
        key=lambda x: abs(x["contribution"]),
        reverse=True
    )

    return explanation