import Cart from "../cart/Cart";
import { Link, useNavigate } from "react-router-dom";
import { UserRole } from "../Auth/UserRole";
import personImage from "../../../assets/images/person.png";

export default function Navbar() {
  const role = UserRole();
  const navigate = useNavigate();
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };
  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to SignOut")) {
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      navigate("/");
    }
  };

  return (
    <div className="navbar z-[100] bg-gray-50 top-0 absolute right-0">
      <div className="navbar-start ml-10">
        <Link to="/" className="btn btn-ghost text-black text-lg rounded-md">
          Sbabeet
        </Link>
        <ul className="menu menu-horizontal flex px-1">
          <li>
            <Link to="/" className="text-base rounded-md text-black">
              Home
            </Link>
          </li>
          <li>
            <Link to="/product" className="text-base rounded-md text-black">
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={(e) => scrollToSection(e, "about")}
              className="text-base rounded-md text-black"
            >
              About us
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={(e) => scrollToSection(e, "contact")}
              className="text-base rounded-md text-black"
            >
              Contact us
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center">
          {role ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src={personImage}
                      className="w-10 rounded-full"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <Link to="/profile">
                    <li>
                      <button className="justify-between btn btn-ghost rounded-md">
                        Profile
                      </button>
                    </li>
                  </Link>

                  {role == "admin" && (
                    <Link to="/admin">
                      <li>
                        <button className="btn btn-ghost justify-start rounded-md">
                          Admin Dashboard
                        </button>
                      </li>
                    </Link>
                  )}

                  <li>
                    <button
                      onClick={handleSignOut}
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
            <Link to={"/SignIn"} className="btn btn-neutral rounded-md me-10">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
