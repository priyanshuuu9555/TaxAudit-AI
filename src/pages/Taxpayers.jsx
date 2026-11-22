import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Eye, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Taxpayers() {
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
        console.error("Taxpayer API Error:", error);
      });
  }, []);

  const filteredTaxpayers = taxpayers.filter((taxpayer) =>
    taxpayer.taxpayer_id
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-slate-400">
          Taxpayer Management
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Taxpayers
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Browse taxpayer records and perform AI risk analysis.
        </p>
      </div>

      {/* Stats */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
            <Users size={20} />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Total Taxpayers
            </p>

            <p className="text-2xl font-bold text-slate-900">
              {taxpayers.length.toLocaleString()}
            </p>
          </div>

        </div>

      </div>

      {/* Search */}
      <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3">

        <Search
          size={18}
          className="text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search taxpayer ID..."
          className="ml-3 flex-1 bg-transparent text-sm outline-none"
        />

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                  Taxpayer ID
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                  Income
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                  Deductions
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                  GST Turnover
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
                    ₹{taxpayer.total_deductions.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    ₹{taxpayer.gst_turnover.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {taxpayer.compliance_score}
                  </td>

                  <td className="px-6 py-4">

                    {taxpayer.risk_label === 1 ? (
                      <span className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                        High
                      </span>
                    ) : (
                      <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                        Low
                      </span>
                    )}

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
                      Analyze
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400">
          Showing {Math.min(filteredTaxpayers.length, 100)} of{" "}
          {filteredTaxpayers.length.toLocaleString()} taxpayers
        </div>

      </div>

    </div>
  );
}

export default Taxpayers;