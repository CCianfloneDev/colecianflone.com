import { Link, useLocation } from "react-router";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Cole", isBrand: true },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function NavBar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-100 dark:bg-gray-900 shadow">
      <div className="max-w-6xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-16 4xl:px-20">
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex items-center justify-start h-16 3xl:h-24 4xl:h-28 gap-8 lg:gap-12 3xl:gap-20 4xl:gap-24">
            {navItems.map((item) => (
              <li key={item.to} className="min-w-[60px] 3xl:min-w-[80px] 4xl:min-w-[100px] text-center">
                <Link
                  to={item.to}
                  className={`block font-medium transition-colors duration-200 text-responsive-lg ${
                    location.pathname === item.to
                      ? "text-blue-600 dark:text-blue-400 underline"
                      : "text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                  } ${item.isBrand ? "font-bold" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between h-16">
            {/* Brand/Logo */}
            <Link
              to="/"
              className="text-xl font-bold text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
              onClick={closeMenu}
            >
              Cole
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-gray-100 dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700">
              <ul className="py-2">
                {navItems.slice(1).map((item) => ( // Skip "Cole" since it's already in the header
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`block px-4 py-3 text-lg font-medium transition-colors ${
                        location.pathname === item.to
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "text-gray-800 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                      }`}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}