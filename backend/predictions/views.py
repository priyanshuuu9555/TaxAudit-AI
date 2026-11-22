import joblib
import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response

from taxpayers.models import Taxpayer
from ml.risk_engine import evaluate_rules
from ml.hybrid_score import calculate_hybrid_score
from ml.explain_prediction import explain_prediction


model = joblib.load("ml/models/xgboost.pkl")
scaler = joblib.load("ml/models/scaler.pkl")


FEATURES = [
    "total_income",
    "total_deductions",
    "refund_claimed",
    "gst_turnover",
    "compliance_score",
    "deduction_ratio",
    "refund_ratio",
]


@api_view(["GET"])
def predict_risk(request, taxpayer_id):

    try:
        taxpayer = Taxpayer.objects.get(
            taxpayer_id=taxpayer_id
        )
    except Taxpayer.DoesNotExist:
        return Response(
            {"error": "Taxpayer not found"},
            status=404
        )

    taxpayer_data = {
        "total_income": taxpayer.total_income,
        "total_deductions": taxpayer.total_deductions,
        "refund_claimed": taxpayer.refund_claimed,
        "gst_turnover": taxpayer.gst_turnover,
        "compliance_score": taxpayer.compliance_score,
        "deduction_ratio": taxpayer.deduction_ratio,
        "refund_ratio": taxpayer.refund_ratio,
    }

    # -----------------------------
    # ML Prediction
    # -----------------------------

    input_data = pd.DataFrame(
        [taxpayer_data],
        columns=FEATURES
    )

    scaled_data = scaler.transform(input_data)

    probability = model.predict_proba(
        scaled_data
    )[0][1]

    # -----------------------------
    # Expert Rules
    # -----------------------------

    rule_result = evaluate_rules(
        taxpayer_data
    )

    # -----------------------------
    # Hybrid Score
    # -----------------------------

    hybrid_result = calculate_hybrid_score(
        probability,
        rule_result["rule_score"]
    )

    # -----------------------------
    # SHAP
    # -----------------------------

    shap_result = explain_prediction(
        taxpayer_data
    )

    return Response({

        "taxpayer_id": taxpayer.taxpayer_id,

        "ml_probability": round(
            float(probability),
            4
        ),

        "ml_score": hybrid_result["ml_score"],

        "rule_score": rule_result["rule_score"],

        "hybrid_score": hybrid_result[
            "hybrid_score"
        ],

        "risk_level": hybrid_result[
            "risk_level"
        ],

        "audit_priority": hybrid_result[
            "audit_priority"
        ],

        "rules_triggered": rule_result[
            "rules_triggered"
        ],

        "shap_explanation": shap_result,

    })