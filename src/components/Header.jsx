import React, { useContext, useState } from "react";
import { Link } from "react-router";
import logo from "../assets/images/logo.png";
import DarkModeToggle from "./DarkModeToggle";

import { FiLogIn, FiMenu, FiX } from "react-icons/fi";
import { AuthContext } from "../provider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogOut = () => {
    console.log("user trying logout");
    logOut()
      .then(() => {
        alert("You logged out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <header className="bg-[#f0f2e9] text-[#1d2b1f] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logo} alt="LeafyLife Logo" className="h-10 lg:mr-28" />
          </Link>
        </div>

        <button
          className="md:hidden text-2xl text-green-800"
          onClick={toggleMenu}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className="hidden md:flex flex-1 items-center justify-between ml-8">
          <nav>
            <ul className="flex gap-6 text-sm font-medium items-center">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/gardeners">Explore Gardeners</Link></li>
              <li><Link to="/tips">Browse Tips</Link></li>
              <li><Link to="/share-tip">Share a Garden Tip</Link></li>
              <li><Link to="/my-tips">My Tips</Link></li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <p className="text-sm font-medium">{user?.email}</p>
            <DarkModeToggle />
            <img
            src={user?.photoURL || 'https://i.ibb.co/3B8F5kL/default-user.png'}
            alt="Profile"
            title={user?.name || 'Guest'} // 👈 Show name on hover
            className="w-9 h-9 rounded-full object-cover border-2 border-green-700"
            />


            {user ? (
              <button onClick={handleLogOut} className="btn btn-primary">
                Logout
              </button>
            ) : (
              <Link
                to="/auth/login"
                className="flex items-center gap-1 text-sm bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 transition"
              >
                <FiLogIn />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav>
            <ul className="flex flex-col gap-2 text-sm font-medium">
              <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/gardeners" onClick={toggleMenu}>Explore Gardeners</Link></li>
              <li><Link to="/tips" onClick={toggleMenu}>Browse Tips</Link></li>
              <li><Link to="/share-tip" onClick={toggleMenu}>Share a Garden Tip</Link></li>
              <li><Link to="/my-tips" onClick={toggleMenu}>My Tips</Link></li>
            </ul>
          </nav>

          <div className="mt-4 flex items-center gap-4">
            <DarkModeToggle />

            <p className="text-sm font-medium">{user?.email}</p>
            <img
  src={user?.photoURL || logo}
  alt="Profile"
  className="w-9 h-9 rounded-full object-cover border-2 border-green-700"
/>

            {user ? (
              <button onClick={handleLogOut} className="btn btn-primary">
                Logout
              </button>
            ) : (
              <Link
                to="/auth/login"
                className="flex items-center gap-1 text-sm bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 transition"
              >
                <FiLogIn />
                Login
              </Link>
              
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
