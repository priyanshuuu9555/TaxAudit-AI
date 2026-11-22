import { useEffect, useState } from "react";
import axios from "axios";
import { ClipboardCheck, Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AuditQueue() {
  const [taxpayers, setTaxpayers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/taxpayers/")
      .then((response) => {
        setTaxpayers(response.data);
      })
      .catch((error) => {
        console.error("Audit Queue Error:", error);
      });
  }, []);

  const highRiskTaxpayers = taxpayers.filter(
    (taxpayer) => taxpayer.risk_label === 1
  );

  const filteredTaxpayers = highRiskTaxpayers.filter((taxpayer) =>
    taxpayer.taxpayer_id
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-slate-400">
          Audit Management
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Audit Queue
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Taxpayers requiring further AI-assisted audit review.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-5 md:grid-cols-3">

        <SummaryCard
          icon={ClipboardCheck}
          title="Audit Candidates"
          value={highRiskTaxpayers.length.toLocaleString()}
        />

        <SummaryCard
          title="Review Status"
          value="Pending"
          subtitle="Requires auditor review"
        />

        <SummaryCard
          title="AI Engine"
          value="Active"
          subtitle="XGBoost + Expert Rules"
        />

      </div>

      {/* Search */}
      <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3">

        <Search size={18} className="text-slate-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search taxpayer ID..."
          className="ml-3 flex-1 bg-transparent text-sm outline-none"
        />

      </div>

      {/* Queue */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="font-bold text-slate-900">
            Priority Audit Candidates
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Candidates identified by the machine-learning risk model.
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                  Taxpayer
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                  Income
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                  Deduction Ratio
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                  Refund Ratio
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                  Compliance
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                  Risk
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredTaxpayers.slice(0, 100).map((taxpayer) => (

                <tr
                  key={taxpayer.taxpayer_id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >

                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-800">
                      {taxpayer.taxpayer_id}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    ₹{taxpayer.total_income.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {(taxpayer.deduction_ratio * 100).toFixed(1)}%
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {(taxpayer.refund_ratio * 100).toFixed(1)}%
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {taxpayer.compliance_score}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                      High Risk
                    </span>
                  </td>

                  <td className="px-6 py-4">

                    <button
                      onClick={() =>
                        navigate(
                          `/risk-analysis?taxpayer=${taxpayer.taxpayer_id}`
                        )
                      }
                      className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                    >
                      <Eye size={14} />
                      Review
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400">
          Showing {Math.min(filteredTaxpayers.length, 100)} of{" "}
          {filteredTaxpayers.length.toLocaleString()} audit candidates
        </div>

      </div>

    </div>
  );
}

function SummaryCard({ icon: Icon, title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      {Icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <Icon size={19} />
        </div>
      )}

      <p className="text-xs font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-400">
          {subtitle}
        </p>
      )}

    </div>
  );
}

export default AuditQueue;k 