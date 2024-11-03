import Cart from "./Cart";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const productCategory = ["Electronics", "Gadgets", "Clothes"];
  const handleLogin = function () {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <div className="navbar z-10 bg-gray-900 top-0 absolute right-0">
      <div className="navbar-start">
        <a className="btn btn-ghost text-lg rounded-md">Shoplytic</a>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal flex flex-row px-1">
          <li>
            <Link to={"/"} className="text-base rounded-md">
              Home
            </Link>
          </li>
          <li>
            <details>
              <summary className="text-base rounded-md">Products</summary>
              <ul className="p-2">
                {productCategory.map((category, index) => (
                  <li key={index}>
                    <Link to={`/${category}`} className="text-base rounded-md">
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <Link className="text-base rounded-md">About us</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center">
          {isLoggedIn ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <button className="justify-between btn btn-ghost rounded-md">
                      Profile
                      <span className="badge">New</span>
                    </button>
                  </li>
                  <li>
                    <button className="btn btn-ghost justify-start rounded-md">
                      Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogin}
                      className="btn btn-ghost justify-start rounded-md"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
              <Cart />
            </>
          ) : (
            <Link to={"/Auth"} className="btn btn-primary rounded-md">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
