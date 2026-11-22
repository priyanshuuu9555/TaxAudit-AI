def calculate_hybrid_score(ml_probability, rule_score):
    """
    Combine ML probability and expert-rule score.

    ML probability: 0 to 1
    Rule score: 0 to 8
    """

    # Convert ML probability to percentage
    ml_score = ml_probability * 100

    # Convert rule score to percentage
    rule_percentage = (rule_score / 8) * 100

    # Hybrid weighting
    hybrid_score = (
        0.70 * ml_score +
        0.30 * rule_percentage
    )

    # Risk classification
    if hybrid_score >= 70:
        risk_level = "HIGH"

    elif hybrid_score >= 40:
        risk_level = "MEDIUM"

    else:
        risk_level = "LOW"

    # Audit priority
    if hybrid_score >= 85:
        priority = "CRITICAL"

    elif hybrid_score >= 70:
        priority = "HIGH"

    elif hybrid_score >= 40:
        priority = "MEDIUM"

    else:
        priority = "LOW"

    return {
        "ml_score": round(ml_score, 2),
        "rule_percentage": round(rule_percentage, 2),
        "hybrid_score": round(hybrid_score, 2),
        "risk_level": risk_level,
        "audit_priority": priority,
    }