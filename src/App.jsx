import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import RiskAnalysis from "./pages/RiskAnalysis";
import Taxpayers from "./pages/Taxpayers";

function SimplePage({ title }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        This module will be connected to Django backend and database.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>

        <Routes>

          <Route path="/" element={<Dashboard />} />

          <Route path="/taxpayers" element={<Taxpayers />} />

          <Route
  path="/risk-analysis"
  element={<RiskAnalysis />}
/>

          <Route
            path="/audit-queue"
            element={<SimplePage title="Audit Queue" />}
          />

          <Route
            path="/predictions"
            element={<SimplePage title="Predictions" />}
          />

          <Route
            path="/reports"
            element={<SimplePage title="Reports" />}
          />

          <Route
            path="/settings"
            element={<SimplePage title="Settings" />}
          />

        </Routes>

      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;