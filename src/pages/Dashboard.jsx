import {
  Users,
  ShieldAlert,
  ClipboardCheck,
  Activity,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {


  const [prediction, setPrediction] = useState(null);
  const [taxpayerCount, setTaxpayerCount] = useState(0);
  const [riskCounts, setRiskCounts] = useState({
  low: 0,
  medium: 0,
  high: 0,
});

  useEffect(() => {

  axios
    .get("http://127.0.0.1:8000/api/predictions/TXP-10000/")
    .then((response) => {
      setPrediction(response.data);
    })
    .catch((error) => {
      console.error("Prediction API Error:", error);
    });


  axios
  .get("http://127.0.0.1:8000/api/taxpayers/")
  .then((response) => {

    const taxpayers = response.data;

    setTaxpayerCount(taxpayers.length);

    const high = taxpayers.filter(
      (taxpayer) => taxpayer.risk_label === 1
    ).length;

    const low = taxpayers.length - high;

    setRiskCounts({
      low: low,
      medium: 0,
      high: high,
    });

  })
    .catch((error) => {
      console.error("Taxpayer API Error:", error);
    });

}, []);

  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Tax Audit Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          AI-powered taxpayer risk analysis and audit prioritization
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
        icon={Users}
        title="Total Taxpayers"
        value={taxpayerCount.toLocaleString()}
        subtitle="Synthetic taxpayer records"
        />

        <StatCard
  icon={ShieldAlert}
  title="High Risk"
  value={riskCounts.high.toLocaleString()}
  subtitle={`${((riskCounts.high / taxpayerCount) * 100 || 0).toFixed(2)}% of taxpayers`}
/>

        <StatCard
          icon={ClipboardCheck}
          title="Audit Queue"
          value="347"
          subtitle="73 critical cases"
        />

        <StatCard
  icon={Activity}
  title="AI Predictions"
  value={taxpayerCount.toLocaleString()}
  subtitle="XGBoost model operational"
/>

      </div>

      {/* Main Section */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Risk Overview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-bold text-slate-900">
                Risk Distribution
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Current taxpayer risk classification
              </p>
            </div>

            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
              Current Period
            </span>

          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            <RiskBox
  label="Low Risk"
  value={riskCounts.low.toLocaleString()}
  percentage={`${((riskCounts.low / taxpayerCount) * 100 || 0).toFixed(1)}%`}
/>

<RiskBox
  label="Medium Risk"
  value={riskCounts.medium.toLocaleString()}
  percentage={`${((riskCounts.medium / taxpayerCount) * 100 || 0).toFixed(1)}%`}
/>

<RiskBox
  label="High Risk"
  value={riskCounts.high.toLocaleString()}
  percentage={`${((riskCounts.high / taxpayerCount) * 100 || 0).toFixed(1)}%`}
/>

          </div>

        </div>

        {/* AI Engine */}
        <div className="rounded-2xl bg-[#0b1220] p-6 text-white">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-900">
              <Activity size={20} />
            </div>

            <div>
              <h2 className="font-bold">
                AI Risk Engine
              </h2>

              <p className="text-xs text-slate-400">
                Hybrid ML + Expert Rules
              </p>
            </div>

          </div>

          <div className="mt-8">

            <p className="text-xs text-slate-400">
              System Status
            </p>

            <div className="mt-2 flex items-center gap-2">

              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

              <span className="text-sm font-semibold">
                Operational
              </span>

            </div>

          </div>

          <div className="mt-6 border-t border-white/10 pt-5">

            <div className="flex justify-between text-xs">
              <span className="text-slate-400">
                Predictions processed
              </span>

              <span className="font-semibold">
                98.7%
              </span>
            </div>

            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div className="h-2 w-[98.7%] rounded-full bg-white" />
            </div>

          </div>

        </div>

      </div>

      {/* Recent Audit Cases */}
      <div className="rounded-2xl border border-slate-200 bg-white">

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>
            <h2 className="font-bold text-slate-900">
              Recent Audit Cases
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Taxpayers requiring review
            </p>
          </div>

          <button className="text-xs font-semibold text-slate-700 hover:underline">
            View All
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-400">
                <th className="px-6 py-4 font-semibold">
                  Taxpayer
                </th>

                <th className="px-6 py-4 font-semibold">
                  Risk Score
                </th>

                <th className="px-6 py-4 font-semibold">
                  Risk Level
                </th>

                <th className="px-6 py-4 font-semibold">
                  Priority
                </th>
              </tr>
            </thead>

            <tbody>

              <AuditRow
                name="TXP-10482"
                score="94.2%"
                risk="High"
                priority="Critical"
              />

              <AuditRow
                name="TXP-10891"
                score="87.6%"
                risk="High"
                priority="High"
              />

              <AuditRow
                name="TXP-11247"
                score="76.3%"
                risk="High"
                priority="High"
              />

              <AuditRow
                name="TXP-11562"
                score="61.8%"
                risk="Medium"
                priority="Medium"
              />

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}


function StatCard({ icon: Icon, title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Icon size={19} />
        </div>

      </div>

      <p className="mt-5 text-xs font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-slate-400">
        {subtitle}
      </p>

    </div>
  );
}


function RiskBox({ label, value, percentage }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">

      <p className="text-xs font-medium text-slate-500">
        {label}
      </p>

      <div className="mt-2 flex items-end justify-between">

        <p className="text-xl font-bold text-slate-900">
          {value}
        </p>

        <p className="text-xs font-semibold text-slate-500">
          {percentage}
        </p>

      </div>

    </div>
  );
}


function AuditRow({ name, score, risk, priority }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">

      <td className="px-6 py-4">
        <span className="text-sm font-semibold text-slate-800">
          {name}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm font-semibold text-slate-700">
          {score}
        </span>
      </td>

      <td className="px-6 py-4">

        <span className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
          {risk}
        </span>

      </td>

      <td className="px-6 py-4">

        <span className="text-xs font-bold text-slate-700">
          {priority}
        </span>

      </td>

    </tr>
  );
}


export default Dashboard;