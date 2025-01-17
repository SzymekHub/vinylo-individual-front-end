import {
  Home,
  Disc3,
  DoorOpen,
  LibraryBig,
  Library,
  UserPlus,
  ShoppingBasket,
  MessagesSquare,
  CircleUserRound,
  ShoppingCart,
  PlusCircle,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import vinylo_logo from "../../assets/img/vinylo_logo.png";
import TokenManager from "../hooks/TokenManager";

export default function NavBar({
  claims,
  setClaims,
  setLocalClaims,
  setUserDetails,
}) {
  const dropdownTypes = {
    PROFILE: "profile",
    AUCTIONS: "auctions",
    HOMES: "homes",
    ADD_VINYLS: "addVinyls",
  };
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const profileRef = useRef(null);
  const auctionsRef = useRef(null);
  const homesRef = useRef(null);
  const addVinylsRef = useRef(null);
  const dropdownRefs = {
    [dropdownTypes.PROFILE]: profileRef,
    [dropdownTypes.AUCTIONS]: auctionsRef,
    [dropdownTypes.HOMES]: homesRef,
    [dropdownTypes.ADD_VINYLS]: addVinylsRef,
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        openDropdown &&
        dropdownRefs[openDropdown].current &&
        !dropdownRefs[openDropdown].current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const handleLogout = () => {
    TokenManager.clear();
    setClaims(null);
    setLocalClaims(null);
    setUserDetails(null);
    navigate("/", { replace: true });
  };

  const roles = TokenManager.getRoles();

  const handleDropdownToggle = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const profileDropdownItems = claims
    ? [
        { name: "Profile", icon: CircleUserRound, path: "/Profile" },
        { name: "Collection", icon: Library, path: "/Collection" },
        { name: "Logout", icon: DoorOpen, onClick: handleLogout },
      ]
    : [
        { name: "Login", icon: DoorOpen, path: "/Login" },
        { name: "Register", icon: UserPlus, path: "/Register" },
      ];

  const auctionsDropdownItems = [
    { name: "Auctions", icon: ShoppingCart, path: "/Auctions" },
    { name: "Sell Vinyls", icon: ShoppingBasket, path: "/SellAuctions" },
  ];

  const loggedInHomeDropdownItems = [
    {
      name: "Home",
      icon: Home,
      path: "/",
    },
    {
      name: "All Vinyls",
      icon: LibraryBig,
      path: "/AllVinyls",
    },
    {
      name: "Chat",
      icon: MessagesSquare,
      path: "/Chat",
    },
  ];

  const loggedOutHomeDropdownItems = [
    {
      name: "Home",
      icon: Home,
      path: "/",
    },
  ];
  const addVinylsDropdownItems = [
    {
      name: "Vinyls",
      icon: Disc3,
      path: "/Vinyls",
    },
  ];

  const mobileNavItems = [
    { name: "Home", icon: Home, path: "/" },
    {
      name: "Chat",
      icon: MessagesSquare,
      path: "/Chat",
    },
    {
      name: "Collection",
      icon: Library,
      path: "/Collection",
    },
    {
      name: "All Vinyls",
      icon: LibraryBig,
      path: "/AllVinyls",
    },
    {
      name: "Sell Vinyls",
      icon: ShoppingBasket,
      path: "/SellAuctions",
    },
    {
      name: "Auctions",
      icon: ShoppingCart,
      path: "/Auctions",
    },

    ...(roles && roles.includes("ADMIN")
      ? [{ name: "Vinyls", icon: Disc3, path: "/Vinyls" }]
      : []),
    {
      name: "Profile",
      icon: CircleUserRound,
      path: "/Profile",
    },
    { name: "Logout", icon: DoorOpen, onClick: handleLogout },
  ];

  const mobileGuestItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Login", icon: DoorOpen, path: "/Login" },
    { name: "Register", icon: UserPlus, path: "/Register" },
  ];

  return (
    <div className="w-full max-auto fixed top-0 left-0 shadow-lg z-10 bg-emerald-700 text-emerald-50 opacity-60 hover:opacity-100">
      <nav className="flex items-center justify-between w-full p-4 shadow-lg bg-emerald-700">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={vinylo_logo} alt="logo" className="w-50 h-10" />
          </Link>
        </div>

        {/* Centered navigation items for larger screens */}
        <ul className="hidden md:flex justify-center space-x-6 flex-grow"></ul>

        {/* Home icon with dropdown */}
        <div className="relative md:flex hidden" ref={homesRef}>
          <button
            onClick={() => handleDropdownToggle(dropdownTypes.HOMES)}
            className="p-2 rounded-full hover:bg-emerald-600 focus:outline-none"
          >
            <Home className="h-6 w-6 text-emerald-50" />
          </button>

          {openDropdown === dropdownTypes.HOMES && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-xl bg-emerald-700">
              {claims
                ? loggedInHomeDropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={item.onClick}
                      className="block px-4 py-2 text-emerald-50 hover:bg-emerald-600"
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4 text-emerald-50" />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ))
                : loggedOutHomeDropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={item.onClick}
                      className="block px-4 py-2 text-emerald-50 hover:bg-emerald-600"
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4 text-emerald-50" />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ))}
            </div>
          )}
        </div>

        {/* Add Vinyls icon with dropdown */}
        {roles && roles.includes("ADMIN") && (
          <div className="relative md:flex hidden" ref={addVinylsRef}>
            <button
              onClick={() => handleDropdownToggle(dropdownTypes.ADD_VINYLS)}
              className="p-2 rounded-full hover:bg-emerald-600 focus:outline-none"
            >
              <PlusCircle className="h-6 w-6 text-emerald-50" />
            </button>

            {openDropdown === dropdownTypes.ADD_VINYLS && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-xl bg-emerald-700">
                {addVinylsDropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={item.onClick}
                    className="block px-4 py-2 text-emerald-50 hover:bg-emerald-600"
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4 text-emerald-50" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Auction icon with dropdown */}
        {claims && (
          <div className="relative md:flex hidden" ref={auctionsRef}>
            <button
              onClick={() => handleDropdownToggle(dropdownTypes.AUCTIONS)}
              className="p-2 rounded-full hover:bg-emerald-600 focus:outline-none"
            >
              <ShoppingCart className="h-6 w-6 text-emerald-50" />
            </button>

            {openDropdown === dropdownTypes.AUCTIONS && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-xl bg-emerald-700">
                {auctionsDropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={item.onClick}
                    className="block px-4 py-2 text-emerald-50 hover:bg-emerald-600"
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4 text-emerald-50" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile icon with dropdown */}
        <div className="relative md:flex hidden" ref={profileRef}>
          <button
            onClick={() => handleDropdownToggle(dropdownTypes.PROFILE)}
            className="p-2 rounded-full hover:bg-emerald-600 focus:outline-none"
          >
            <CircleUserRound className="h-6 w-6 text-emerald-50" />
          </button>

          {openDropdown === dropdownTypes.PROFILE && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-xl bg-emerald-700">
              {profileDropdownItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={item.onClick}
                  className="block px-4 py-2 text-emerald-50 hover:bg-emerald-600"
                >
                  <div className="flex items-center">
                    <item.icon className="mr-2 h-4 w-4 text-emerald-50" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

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
        {claims
          ? mobileNavItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center px-3 py-2 rounded-md hover:bg-emerald-600 text-emerald-50 hover:text-emerald-900 transition-colors"
                  onClick={item.onClick}
                >
                  <item.icon className="mr-2 h-5 w-5 text-emerald-50" />
                  {item.name}
                </Link>
              </li>
            ))
          : mobileGuestItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center px-3 py-2 rounded-md hover:bg-emerald-600 text-emerald-50 hover:text-emerald-900 transition-colors"
                >
                  <item.icon className="mr-2 h-5 w-5 text-emerald-50" />
                  {item.name}
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
}
