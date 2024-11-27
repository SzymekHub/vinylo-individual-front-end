import {
  Home,
  Disc3,
  DoorOpen,
  LibraryBig,
  ShoppingBasket,
} from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    //{ name: "Home", icon: Home, path: "/" },
    //{ name: "Vinyls ", icon: Disc3, path: "/Vinyls" },
    { name: "Record Collection", icon: LibraryBig, path: "/RecordCollection" },
    { name: "Auctions", icon: ShoppingBasket, path: "/Auctions" },
    { name: "Login", icon: DoorOpen, path: "/Login" },
  ];

  return (
    <div className="w-full max-auto fixed top-0 left-0 shadow-lg z-10 bg-emerald-700 text-emerald-50 opacity-60 hover:opacity-100">
      <nav className="flex items-center justify-between w-full p-4 shadow-lg bg-emerald-700">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/">
            <img
              src="/src/assets/img/vinylo_logo.png"
              alt="logo"
              className="w-50 h-10"
            />
          </a>
        </div>

        {/* Centered navigation items for larger screens */}
        <ul className="hidden md:flex justify-center space-x-6 flex-grow">
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

        {/* Mobile menu button for small screens */}
        <div className="md:hidden">
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
      </nav>

      {/* Dropdown menu for mobile view */}
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-emerald-700 mt-4`}
      >
        {navItems.map((item) => (
          <li key={item.name} className="text-center">
            <a
              href={item.path}
              className="flex justify-center items-center px-3 py-2 rounded-md hover:bg-emerald-600 text-emerald-50 hover:text-emerald-900 transition-colors"
            >
              <item.icon className="mr-2 h-5 w-5 text-emerald-50" />
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
