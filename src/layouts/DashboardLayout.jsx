import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f7f8fa]">

      <Sidebar />

      <main className="w-full lg:ml-[250px]">

        <Navbar />

        <div className="p-5 md:p-8">
          {children}
        </div>

      </main>

    </div>
  );
}

export default DashboardLayout;