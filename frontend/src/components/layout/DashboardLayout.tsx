import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../../libs/storageHelper";
import { Menu, X } from "lucide-react";
import { SignOutUser } from "../../libs/firebaseHelper";

const menu = [
  { label: "New Qrcode", path: "/dashboard/new-qrcode" },
  { label: "My Qrcode", path: "/dashboard/my-qrcode" },
  { label: "Stats", path: "/dashboard/stats" },
  { label: "Plan & payments", path: "/dashboard/plan-payments" },
  { label: "Settings", path: "/dashboard/settings" },
];

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    signOut();
    SignOutUser();
    navigate("/");
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex-col py-6 px-4">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-indigo-700 dark:text-white">QLIKY</h1>
        </div>
        <nav className="flex flex-col gap-2 mb-8 flex-1">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-3 rounded-lg font-medium transition-colors text-sm ${
                pathname === item.path
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 transition text-sm"
        >
          Logout
        </button>
      </aside>
      
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 py-3 shadow-sm">
        <span className="text-xl font-bold text-indigo-700 dark:text-white">QLIKY</span>
        <button 
          onClick={() => setIsMobileMenuOpen((v) => !v)} 
          className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-14 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 animate-fade-in">
          <nav className="flex flex-col gap-1 p-4 max-h-screen overflow-y-auto">
            {menu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 rounded-lg font-medium transition-colors text-sm ${
                  pathname === item.path
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="mt-4 px-4 py-3 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 transition text-sm"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
      
      <main className="flex-1 pt-14 lg:pt-0 min-w-0">
        <div className="p-4 sm:p-6 lg:p-8 h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
