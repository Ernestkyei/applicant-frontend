import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  CreditCard,
  FileText,
  GraduationCap,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

import { PRIMARY_COLOR } from "./constants";
import type { NavItem } from "./types";

export function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems: Array<NavItem & { to: string }> = [
    { icon: FileText, label: "My Applications", active: location.pathname === "/applicant/dashboard", to: "/applicant/dashboard" },
    { icon: CreditCard, label: "Payments", active: location.pathname === "/applicant/payment", to: "/applicant/payment" },
    { icon: User, label: "Profile", active: false, to: "/applicant/dashboard" },
  ];

  return (
    <nav className="bg-[#14181F] px-6 flex items-center justify-between h-[62px] border-b border-[#2A2F36] sticky top-0 z-50">
      <Link
        to="/"
        className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
      >
        <GraduationCap size={19} className="text-amber-600" />
        <span className="font-serif text-[16px] font-semibold text-white">
          Admissions Registry
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className={`flex items-center gap-1.5 text-[13px] cursor-pointer px-3 py-1.5 rounded-md transition-all ${
              item.active
                ? "text-white bg-white/10 font-semibold"
                : "text-[#9AA4B1] font-medium hover:text-white hover:bg-white/5"
            }`}
          >
            <item.icon size={14} />
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <Bell
          size={17}
          className="text-[#9AA4B1] cursor-pointer hover:text-white transition"
        />

        <div className="flex items-center gap-2 text-[#C7CDD6] text-[13px]">
          <div
            className="w-7 h-7 rounded-full text-white flex items-center justify-center font-serif text-xs font-semibold"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            AS
          </div>

          <span className="hidden sm:inline">Ama</span>

          <LogOut
            size={14}
            className="ml-1.5 cursor-pointer text-[#9AA4B1] hover:text-white transition"
          />
        </div>

        <button
          type="button"
          className="md:hidden text-white hover:text-amber-600 transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[62px] left-0 right-0 bg-[#14181F] px-6 py-4 flex flex-col gap-2 border-t border-[#2A2F36]">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 text-[14px] cursor-pointer px-3 py-2.5 rounded-md transition ${
                item.active
                  ? "text-white bg-white/10 font-semibold"
                  : "text-[#9AA4B1] font-medium hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
