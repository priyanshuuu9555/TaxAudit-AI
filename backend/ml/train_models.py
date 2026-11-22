import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
)

from imblearn.over_sampling import SMOTE
from xgboost import XGBClassifier


# --------------------------------------------------
# 1. Load Dataset
# --------------------------------------------------

DATA_PATH = "ml/data/taxpayer_dataset.csv"

df = pd.read_csv(DATA_PATH)

print("Dataset loaded:", df.shape)


# --------------------------------------------------
# 2. Select Features
# --------------------------------------------------

features = [
    "total_income",
    "total_deductions",
    "refund_claimed",
    "gst_turnover",
    "compliance_score",
    "deduction_ratio",
    "refund_ratio",
]

X = df[features]
y = df["risk_label"]


# --------------------------------------------------
# 3. Train-Test Split
# --------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y,
)


# --------------------------------------------------
# 4. Scale Features
# --------------------------------------------------

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)


# --------------------------------------------------
# 5. SMOTE
# --------------------------------------------------

smote = SMOTE(random_state=42)

X_train_balanced, y_train_balanced = smote.fit_resample(
    X_train_scaled,
    y_train,
)

print("Before SMOTE:", y_train.value_counts().to_dict())
print("After SMOTE:", y_train_balanced.value_counts().to_dict())


# --------------------------------------------------
# 6. Models
# --------------------------------------------------

models = {

    "Logistic Regression": LogisticRegression(
        max_iter=1000,
        random_state=42,
    ),

    "Random Forest": RandomForestClassifier(
        n_estimators=200,
        random_state=42,
    ),

    "XGBoost": XGBClassifier(
        n_estimators=200,
        max_depth=5,
        learning_rate=0.05,
        random_state=42,
        eval_metric="logloss",
    ),
}


# --------------------------------------------------
# 7. Train + Evaluate
# --------------------------------------------------

results = {}

os.makedirs("ml/models", exist_ok=True)

for name, model in models.items():

    print("\nTraining:", name)

    model.fit(
        X_train_balanced,
        y_train_balanced,
    )

    predictions = model.predict(X_test_scaled)

    probabilities = model.predict_proba(
        X_test_scaled
    )[:, 1]

    accuracy = accuracy_score(
        y_test,
        predictions,
    )

    precision = precision_score(
        y_test,
        predictions,
        zero_division=0,
    )

    recall = recall_score(
        y_test,
        predictions,
        zero_division=0,
    )

    f1 = f1_score(
        y_test,
        predictions,
        zero_division=0,
    )

    auc = roc_auc_score(
        y_test,
        probabilities,
    )

    results[name] = {
        "accuracy": accuracy,
        "precision": precision,
        "recall": recall,
        "f1": f1,
        "roc_auc": auc,
    }

    print(f"Accuracy : {accuracy:.4f}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall   : {recall:.4f}")
    print(f"F1 Score : {f1:.4f}")
    print(f"ROC-AUC  : {auc:.4f}")

    # Save model
    filename = name.lower().replace(" ", "_")

    joblib.dump(
        model,
        f"ml/models/{filename}.pkl",
    )


# --------------------------------------------------
# 8. Save Scaler
# --------------------------------------------------

joblib.dump(
    scaler,
    "ml/models/scaler.pkl",
)


# --------------------------------------------------
# 9. Save Results
# --------------------------------------------------

results_df = pd.DataFrame(results).T

results_df.to_csv(
    "ml/models/model_metrics.csv"
)

print("\n--------------------------------")
print("ALL MODELS TRAINED SUCCESSFULLY")
print("--------------------------------")

print(results_df)