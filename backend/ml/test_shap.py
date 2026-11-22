from explain_prediction import explain_prediction


taxpayer = {
    "total_income": 1000000,
    "total_deductions": 400000,
    "refund_claimed": 120000,
    "gst_turnover": 2000000,
    "compliance_score": 35,
    "deduction_ratio": 0.40,
    "refund_ratio": 0.12,
}


result = explain_prediction(taxpayer)

print("\nSHAP EXPLANATION")
print("----------------")

for item in result:
    print(
        item["feature"],
        "| Value:",
        item["value"],
        "| Contribution:",
        item["contribution"]
    )