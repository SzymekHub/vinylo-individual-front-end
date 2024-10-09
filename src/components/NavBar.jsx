import { Home, Disc3, LibraryBig, ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavBar({ selectedNav, setSelectedNav }) {
  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Vinyls ", icon: Disc3, path: "/Vinyls" },
    { name: "Record Collection", icon: LibraryBig },
    { name: "Auctions", icon: ShoppingBasket },
  ];

  return (
    <header
      style={{
        backgroundColor: "rgba(24, 24, 24, 0.6)",
        color: "#fff",
        padding: "10px",
      }}
      className="w-full fixed top-0 left-0 shadow-lg z-10"
    >
      <nav className="flex justify-center items-center w-full">
        <ul className="flex justify-center space-x-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center px-4 py-2 text-left rounded-md"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
