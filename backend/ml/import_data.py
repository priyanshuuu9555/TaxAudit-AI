import pandas as pd
import os
import sys
import django

sys.path.append(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "config.settings"
)

django.setup()

from taxpayers.models import Taxpayer


DATA_PATH = "ml/data/taxpayer_dataset.csv"

df = pd.read_csv(DATA_PATH)

Taxpayer.objects.all().delete()

taxpayers = []

for _, row in df.iterrows():

    taxpayers.append(
        Taxpayer(
            taxpayer_id=row["taxpayer_id"],
            total_income=row["total_income"],
            total_deductions=row["total_deductions"],
            refund_claimed=row["refund_claimed"],
            gst_turnover=row["gst_turnover"],
            compliance_score=row["compliance_score"],
            deduction_ratio=row["deduction_ratio"],
            refund_ratio=row["refund_ratio"],
            risk_label=row["risk_label"],
        )
    )


Taxpayer.objects.bulk_create(
    taxpayers,
    batch_size=500
)

print(f"Imported {len(taxpayers)} taxpayers successfully.")