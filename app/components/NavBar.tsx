import { Link, useLocation } from "react-router";

const navItems = [
  { to: "/", label: "Cole" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function NavBar() {
  const location = useLocation();
  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-100 dark:bg-gray-900 shadow">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex items-center justify-start h-16 gap-8">
          {navItems.map((item) => (
            <li key={item.to} className="min-w-[60px] text-center">
              <Link
                to={item.to}
                className={`block font-medium transition-colors duration-200 ${
                  location.pathname === item.to
                    ? "text-blue-600 dark:text-blue-400 underline"
                    : "text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}