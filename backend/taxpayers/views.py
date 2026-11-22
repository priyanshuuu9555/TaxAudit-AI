from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Taxpayer


@api_view(["GET"])
def taxpayer_list(request):

    taxpayers = Taxpayer.objects.all().order_by("-created_at")

    data = []

    for taxpayer in taxpayers:
        data.append({
            "id": taxpayer.id,
            "taxpayer_id": taxpayer.taxpayer_id,
            "total_income": taxpayer.total_income,
            "total_deductions": taxpayer.total_deductions,
            "refund_claimed": taxpayer.refund_claimed,
            "gst_turnover": taxpayer.gst_turnover,
            "compliance_score": taxpayer.compliance_score,
            "deduction_ratio": taxpayer.deduction_ratio,
            "refund_ratio": taxpayer.refund_ratio,
            "risk_label": taxpayer.risk_label,
        })

    return Response(data)