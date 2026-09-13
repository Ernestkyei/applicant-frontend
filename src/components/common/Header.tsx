import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Menu,
  X,
  Key,
  LogOut,
} from "lucide-react";

interface HeaderProps {
  activeLink?: string;
  isAuthenticated?: boolean;
  user?: {
    name?: string;
    email?: string;
  };
  onLogout?: () => void;
}

export function Header({
  activeLink = "",
  isAuthenticated = false,
  user,
  onLogout,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const hasAccess =
    isAuthenticated || !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("applicationId");

    if (onLogout) {
      onLogout();
    }

    navigate("/");
  };

  const navLinks = hasAccess
    ? [
        {
          name: "My Application",
          href: "/applicant/dashboard",
        },
        {
          name: "Payment",
          href: "/applicant/payment",
        },
        {
          name: "Check Status",
          href: "/applicant/status",
        },
        {
          name: "Profile",
          href: "/applicant/profile",
        },
      ]
    : [
        {
          name: "Home",
          href: "#programs",
        },
      ];

  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-gray-900 w-full">

      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
      >
        <GraduationCap
          size={20}
          className="text-amber-600"
        />

        <span className="text-[17px] font-semibold text-white">
          Admissions Registry
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-7 items-center">

        {navLinks.map((link) => (
          link.href.startsWith("#") ? (
            <button
              key={link.name}
              type="button"
              onClick={() => {
                const target = document.getElementById(
                  link.href.replace("#", "")
                );

                if (target) {
                  target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              className={`text-sm cursor-pointer transition ${
                activeLink === link.name
                  ? "text-amber-600"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.name}
            </button>
          ) : (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm transition ${
                activeLink === link.name
                  ? "text-amber-600"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          )
        ))}

        {hasAccess ? (
          <div className="flex items-center gap-4">

            <span className="text-sm text-gray-400 flex items-center gap-2">
              <Key className="h-3.5 w-3.5 text-amber-600" />
              {user?.name || "Applicant"}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-white transition flex items-center gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>

          </div>
        ) : (
          <Link
            to="/access-code"
            className="bg-amber-600 text-gray-900 border-none px-5 py-2.5 rounded-md text-sm font-semibold cursor-pointer hover:bg-amber-500 transition flex items-center gap-2"
          >
            <Key className="h-4 w-4" />
            Enter Access Code
          </Link>
        )}

      </div>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="md:hidden text-white"
        onClick={() =>
          setMobileMenuOpen(!mobileMenuOpen)
        }
      >
        {mobileMenuOpen ? (
          <X size={24} />
        ) : (
          <Menu size={24} />
        )}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-gray-800 px-6 py-4 flex flex-col gap-4 w-full z-50">

          {navLinks.map((link) => (
            link.href.startsWith("#") ? (
              <button
                key={link.name}
                type="button"
                className={`text-sm cursor-pointer transition text-left ${
                  activeLink === link.name
                    ? "text-amber-600"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => {
                  const target = document.getElementById(
                    link.href.replace("#", "")
                  );

                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }

                  setMobileMenuOpen(false);
                }}
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm cursor-pointer transition text-left ${
                  activeLink === link.name
                    ? "text-amber-600"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            )
          ))}

          {hasAccess ? (
            <>
              <div className="text-sm text-gray-400 flex items-center gap-2 py-2 border-t border-gray-700">
                <Key className="h-3.5 w-3.5 text-amber-600" />
                {user?.name || "Applicant"}
              </div>

              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2 text-left"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/access-code"
              className="bg-amber-600 text-gray-900 px-5 py-2.5 rounded-md text-sm font-semibold text-center hover:bg-amber-500 transition flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Key className="h-4 w-4" />
              Enter Access Code
            </Link>
          )}

        </div>
      )}
    </nav>
  );
}