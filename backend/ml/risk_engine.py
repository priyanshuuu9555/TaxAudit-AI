def evaluate_rules(taxpayer):
    """
    Expert rule engine for tax audit risk.
    Returns triggered rules and rule-based risk score.
    """

    rules = []
    score = 0

    income = taxpayer["total_income"]
    deductions = taxpayer["total_deductions"]
    refund = taxpayer["refund_claimed"]
    gst_turnover = taxpayer["gst_turnover"]
    compliance = taxpayer["compliance_score"]

    deduction_ratio = deductions / income if income > 0 else 0
    refund_ratio = refund / income if income > 0 else 0

    # ER-01
    if deduction_ratio > 0.30:
        rules.append({
            "code": "ER-01",
            "name": "High Deduction Ratio",
            "reason": "Deduction ratio exceeds 30%",
            "severity": "HIGH"
        })
        score += 2

    # ER-02
    if refund_ratio > 0.08:
        rules.append({
            "code": "ER-02",
            "name": "High Refund Claim",
            "reason": "Refund claimed is unusually high relative to income",
            "severity": "HIGH"
        })
        score += 2

    # ER-03
    turnover_difference = abs(gst_turnover - income) / income

    if turnover_difference > 0.50:
        rules.append({
            "code": "ER-03",
            "name": "GST-ITR Mismatch",
            "reason": "GST turnover differs significantly from declared income",
            "severity": "HIGH"
        })
        score += 2

    # Additional compliance rule
    if compliance < 50:
        rules.append({
            "code": "ER-04",
            "name": "Low Compliance Score",
            "reason": "Taxpayer has a low compliance score",
            "severity": "CRITICAL"
        })
        score += 2

    # Rule-based classification
    if score >= 6:
        risk_level = "HIGH"
    elif score >= 3:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "rules_triggered": rules,
        "rule_score": score,
        "risk_level": risk_level,
    }