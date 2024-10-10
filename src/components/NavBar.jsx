import { Home, Disc3, LibraryBig, ShoppingBasket } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Vinyls ", icon: Disc3, path: "/Vinyls" },
    { name: "Record Collection", icon: LibraryBig },
    { name: "Auctions", icon: ShoppingBasket },
  ];

  return (
    <div className="w-full max-auto fixed top-0 left-0 shadow-lg z-10 bg-emerald-700 text-emerald-50 opacity-60 hover:opacity-100">
      <nav className="w-full max-auto bg-emerald-700 p-4 shadow-lg">
        {/* Mobile menu button */}
        <div className="flex justify-between items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-emerald-50 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Larger screens menu */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:justify-center md:space-x-4 mt-4 md:mt-0`}
        >
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.path}
                className="flex items-center px-3 py-2 rounded-md hover:bg-emerald-600 text-emerald-50 hover:text-emerald-900 transition-colors"
              >
                <item.icon className="mr-2 h-5 w-5 text-emerald-50" />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
