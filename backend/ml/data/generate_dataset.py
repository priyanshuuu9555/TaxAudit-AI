import pandas as pd
import numpy as np

np.random.seed(42)

N = 10000

data = pd.DataFrame({
    "taxpayer_id": [f"TXP-{10000 + i}" for i in range(N)],

    "total_income": np.random.randint(
        200000, 5000000, N
    ),

    "total_deductions": np.random.randint(
        10000, 1500000, N
    ),

    "refund_claimed": np.random.randint(
        0, 500000, N
    ),

    "gst_turnover": np.random.randint(
        200000, 6000000, N
    ),

    "compliance_score": np.random.randint(
        20, 101, N
    ),
})

# Feature engineering
data["deduction_ratio"] = (
    data["total_deductions"] /
    data["total_income"]
)

data["refund_ratio"] = (
    data["refund_claimed"] /
    data["total_income"]
)

# Create synthetic risk label
risk_score = (
    (data["deduction_ratio"] > 0.30).astype(int) * 2
    + (data["refund_ratio"] > 0.08).astype(int) * 2
    + (
        abs(data["gst_turnover"] - data["total_income"])
        / data["total_income"] > 0.50
    ).astype(int) * 2
    + (data["compliance_score"] < 50).astype(int) * 2
)

data["risk_label"] = (
    risk_score >= 3
).astype(int)

# Save dataset
data.to_csv(
    "ml/data/taxpayer_dataset.csv",
    index=False
)

print("Dataset generated successfully!")
print(f"Total records: {len(data)}")
print("\nRisk distribution:")
print(data["risk_label"].value_counts())

print("\nDataset saved to:")
print("ml/data/taxpayer_dataset.csv")