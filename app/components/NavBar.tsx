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
    <nav className="flex gap-6 py-4 px-8 bg-gray-100 dark:bg-gray-900 shadow">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`font-medium ${
            location.pathname === item.to
              ? "text-blue-600 dark:text-blue-400 underline"
              : "text-gray-800 dark:text-gray-200"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}