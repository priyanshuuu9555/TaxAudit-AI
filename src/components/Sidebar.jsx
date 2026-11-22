import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  ClipboardCheck,
  Activity,
  FileBarChart,
  Settings,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[250px] flex-col bg-[#0b1220] text-white lg:flex">

      {/* Logo */}
      <div className="flex h-20 items-center border-b border-white/10 px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-900">
            <BrainCircuit size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">
              TaxAudit
            </h1>

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Intelligence
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">

        {/* Overview */}
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Overview
        </p>

        <nav className="space-y-1">

          <NavItem
            icon={LayoutDashboard}
            label="Dashboard"
            path="/"
            active={location.pathname === "/"}
          />

          <NavItem
            icon={Users}
            label="Taxpayers"
            path="/taxpayers"
            active={location.pathname.startsWith("/taxpayers")}
          />

          <NavItem
            icon={ShieldAlert}
            label="Risk Analysis"
            path="/risk-analysis"
            badge="AI"
            active={location.pathname.startsWith("/risk-analysis")}
          />

          <NavItem
            icon={ClipboardCheck}
            label="Audit Queue"
            path="/audit-queue"
            badge="73"
            active={location.pathname.startsWith("/audit-queue")}
          />

          <NavItem
            icon={Activity}
            label="Predictions"
            path="/predictions"
            active={location.pathname.startsWith("/predictions")}
          />

        </nav>

        {/* Management */}
        <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Management
        </p>

        <nav className="space-y-1">

          <NavItem
            icon={FileBarChart}
            label="Reports"
            path="/reports"
            active={location.pathname.startsWith("/reports")}
          />

          <NavItem
            icon={Settings}
            label="Settings"
            path="/settings"
            active={location.pathname.startsWith("/settings")}
          />

        </nav>

        {/* AI Status */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-4">

          <div className="mb-3 flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-900">
              <Sparkles size={16} />
            </div>

            <div>
              <p className="text-xs font-semibold">
                AI Engine
              </p>

              <p className="text-[10px] text-slate-500">
                Model status
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-xs text-slate-300">
              Operational
            </span>

          </div>

        </div>

      </div>

      {/* User */}
      <div className="border-t border-white/10 p-4">

        <div className="flex items-center gap-3 rounded-xl p-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-600 text-sm font-bold">
            PK
          </div>

          <div className="flex-1">

            <p className="text-sm font-semibold">
              Priyanshu
            </p>

            <p className="text-[11px] text-slate-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}


function NavItem({ icon: Icon, label, active, badge, path }) {
  return (
    <Link
      to={path}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-white text-slate-900 shadow-lg"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >

      <Icon size={18} />

      <span className="flex-1 text-left">
        {label}
      </span>

      {badge && (
        <span
          className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold ${
            active
              ? "bg-slate-100 text-slate-600"
              : "bg-white/10 text-slate-400"
          }`}
        >
          {badge}
        </span>
      )}

    </Link>
  );
}


export default Sidebar;