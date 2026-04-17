import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  MapPin,
  History,
  Key,
  BarChart3,
  Settings,
  ShieldCheck,
  Bell,
  Search,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: Package, label: "Products", path: "/dashboard/products" },
  { icon: MapPin, label: "Tracking", path: "/dashboard/tracking" },
  { icon: History, label: "Verification Logs", path: "/dashboard/logs" },
  { icon: Key, label: "Ownership", path: "/dashboard/ownership" },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#F8F9FB] text-slate-900">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-50",
          sidebarOpen ? "w-64" : "w-20",
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
          {sidebarOpen && (
            <span className="font-bold text-xl tracking-tight">Proof Tag</span>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative group",
                  isActive
                    ? "bg-primary/5 text-primary"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                )
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
              {!sidebarOpen && (
                <div className="absolute left-14 bg-slate-900 text-white px-2 py-1 rounded text-xs invisible group-hover:visible whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div
            className={cn(
              "flex items-center gap-3",
              !sidebarOpen && "justify-center",
            )}
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">Ahmad Uffi</p>
                <p className="text-xs text-slate-400 truncate">Admin Account</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-4 text-slate-400 hover:text-slate-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-bottom border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-lg font-bold capitalize">
              {location.pathname.split("/").pop() || "Overview"}
            </h1>
            <div className="max-w-md w-full relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products, batches, logs..."
                className="w-full bg-slate-100 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
            <div className="h-8 w-px bg-slate-200 mx-2" />
            <Button size="sm">New Batch</Button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
