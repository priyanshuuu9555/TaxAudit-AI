from risk_engine import evaluate_rules


taxpayer = {
    "total_income": 1000000,
    "total_deductions": 400000,
    "refund_claimed": 120000,
    "gst_turnover": 2000000,
    "compliance_score": 35,
}

result = evaluate_rules(taxpayer)

print("\nRULE ENGINE RESULT")
print("------------------")

print("Risk Level:", result["risk_level"])
print("Rule Score:", result["rule_score"])

print("\nTriggered Rules:")

for rule in result["rules_triggered"]:
    print(
        rule["code"],
        "-",
        rule["name"],
        "-",
        rule["severity"]
    )