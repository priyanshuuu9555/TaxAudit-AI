import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Search,
  ShieldAlert,
  BrainCircuit,
  CheckCircle,
  AlertTriangle,
  Zap,
} from "lucide-react";

function RiskAnalysis() {
  const [searchParams] = useSearchParams();

const selectedTaxpayer =
  searchParams.get("taxpayer") || "TXP-10000";

const [taxpayerId, setTaxpayerId] = useState(selectedTaxpayer);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeRisk = async () => {
    if (!taxpayerId.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/predictions/${taxpayerId.trim()}/`
      );

      setResult(response.data);
    } catch (err) {
      setResult(null);
      setError("Taxpayer not found. Please check the Taxpayer ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-slate-400">
          AI-Powered Analysis
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Risk Analysis
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Analyze taxpayer risk using ML predictions, expert rules and SHAP explainability.
        </p>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
            <Search size={20} className="text-slate-700" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Select Taxpayer
            </h2>

            <p className="text-xs text-slate-500">
              Enter a taxpayer ID to perform AI risk analysis
            </p>
          </div>
        </div>

        <div className="flex gap-3">

          <input
            value={taxpayerId}
            onChange={(e) => setTaxpayerId(e.target.value)}
            placeholder="Example: TXP-10000"
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
          />

          <button
            onClick={analyzeRisk}
            disabled={loading}
            className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Risk"}
          </button>

        </div>

        {error && (
          <p className="mt-3 text-sm font-medium text-red-500">
            {error}
          </p>
        )}

      </div>

      {/* Results */}
      {result && (
        <>
          {/* Main Risk */}
          <div className="grid gap-5 md:grid-cols-4">

            <Metric
              icon={BrainCircuit}
              label="ML Probability"
              value={`${(result.ml_probability * 100).toFixed(2)}%`}
            />

            <Metric
              icon={Zap}
              label="Hybrid Score"
              value={result.hybrid_score.toFixed(2)}
            />

            <Metric
              icon={ShieldAlert}
              label="Risk Level"
              value={result.risk_level}
              danger
            />

            <Metric
              icon={AlertTriangle}
              label="Audit Priority"
              value={result.audit_priority}
              danger
            />

          </div>

          {/* Rules + SHAP */}
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Expert Rules */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <ShieldAlert size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Expert Rule Analysis
                  </h2>

                  <p className="text-xs text-slate-500">
                    Deterministic tax-domain rules
                  </p>
                </div>

              </div>

              <div className="mb-5 rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Rule Score
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {result.rule_score}
                  <span className="text-sm font-normal text-slate-400">
                    {" "} / 8
                  </span>
                </p>
              </div>

              <div className="space-y-3">

                {result.rules_triggered.length === 0 ? (
                  <div className="flex items-center gap-2 text-sm text-emerald-600">
                    <CheckCircle size={18} />
                    No expert rules triggered
                  </div>
                ) : (
                  result.rules_triggered.map((rule) => (
                    <div
                      key={rule.code}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                            <AlertTriangle size={16} />
                          </div>

                          <div>
                            <p className="text-sm font-bold text-slate-800">
                              {rule.code}
                            </p>

                            <p className="text-sm text-slate-600">
                              {rule.name}
                            </p>
                          </div>

                        </div>

                        <span className="rounded-lg bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
                          {rule.severity}
                        </span>

                      </div>

                      <p className="mt-3 text-xs text-slate-500">
                        {rule.reason}
                      </p>

                    </div>
                  ))
                )}

              </div>

            </div>

            {/* SHAP */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <BrainCircuit size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    SHAP Explainability
                  </h2>

                  <p className="text-xs text-slate-500">
                    Feature contribution to prediction
                  </p>
                </div>

              </div>

              <div className="space-y-4">

                {result.shap_explanation.map((item) => {

                  const positive = item.contribution >= 0;

                  return (
                    <div key={item.feature}>

                      <div className="mb-1 flex items-center justify-between">

                        <span className="text-xs font-semibold text-slate-700">
                          {item.feature}
                        </span>

                        <span
                          className={`text-xs font-bold ${
                            positive
                              ? "text-red-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {positive ? "+" : ""}
                          {item.contribution.toFixed(4)}
                        </span>

                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                        <div
                          className="h-full rounded-full bg-slate-800"
                          style={{
                            width: `${Math.min(
                              Math.abs(item.contribution) * 20,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                      <p className="mt-1 text-[11px] text-slate-400">
                        Value: {item.value}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        </>
      )}

    </div>
  );
}


function Metric({
  icon: Icon,
  label,
  value,
  danger,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
        <Icon size={19} />
      </div>

      <p className="text-xs font-medium text-slate-500">
        {label}
      </p>

      <p
        className={`mt-1 text-2xl font-bold ${
          danger ? "text-red-600" : "text-slate-900"
        }`}
      >
        {value}
      </p>

    </div>
  );
}


export default RiskAnalysis;