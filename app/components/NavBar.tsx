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
      <div className="max-w-6xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-16 4xl:px-20">
        <ul className="flex items-center justify-start h-16 3xl:h-24 4xl:h-28 gap-8 lg:gap-12 3xl:gap-20 4xl:gap-24">
          {navItems.map((item) => (
            <li key={item.to} className="min-w-[60px] 3xl:min-w-[80px] 4xl:min-w-[100px] text-center">
              <Link
                to={item.to}
                className={`block font-medium transition-colors duration-200 text-base lg:text-lg 3xl:text-2xl 4xl:text-3xl ${
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