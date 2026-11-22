from hybrid_score import calculate_hybrid_score


result = calculate_hybrid_score(
    ml_probability=0.92,
    rule_score=6
)

print("\nHYBRID RISK RESULT")
print("------------------")

print("ML Score:", result["ml_score"])
print("Rule Score:", result["rule_percentage"])
print("Hybrid Score:", result["hybrid_score"])
print("Risk Level:", result["risk_level"])
print("Audit Priority:", result["audit_priority"])