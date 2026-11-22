from django.db import models


class Taxpayer(models.Model):

    taxpayer_id = models.CharField(
        max_length=20,
        unique=True
    )

    total_income = models.FloatField()

    total_deductions = models.FloatField()

    refund_claimed = models.FloatField()

    gst_turnover = models.FloatField()

    compliance_score = models.FloatField()

    deduction_ratio = models.FloatField()

    refund_ratio = models.FloatField()

    risk_label = models.IntegerField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.taxpayer_id