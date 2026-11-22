import { Search, Bell, ChevronDown } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl md:px-8">

      {/* Left */}
      <div>
        <p className="hidden text-xs font-medium text-slate-400 sm:block">
          Tax Audit Intelligence Platform
        </p>

        <h2 className="text-lg font-bold text-slate-900 md:text-xl">
          Dashboard
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <Search size={17} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="ml-2 w-40 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Notification */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50">
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Profile */}
        <div className="hidden items-center gap-2 sm:flex">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
            PK
          </div>

          <div className="hidden lg:block">
            <p className="text-xs font-semibold text-slate-800">
              Priyanshu
            </p>

            <p className="text-[10px] text-slate-400">
              Administrator
            </p>
          </div>

          <ChevronDown size={15} className="text-slate-400" />

        </div>

      </div>
    </header>
  );
}

export default Navbar;