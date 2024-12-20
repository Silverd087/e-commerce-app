import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  ShoppingBag,
  LogOut,
  AlertTriangle,
} from "lucide-react";

function Profile() {
  const userUrl = "https://sbabeetbackend.onrender.com/api/users";
  const orderUrl = "https://sbabeetbackend.onrender.com/api/orders";

  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [show, setShow] = useState(false);
  const [userUpdate, setUpdate] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: [
      {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      },
    ],
  });
  const navigate = useNavigate();
  const [passwordChange, setPasswordChange] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orders, setOrders] = useState([]);

  const handleOrderToggle = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const reload = () => window.location.reload();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }

    if (userId) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      axios
        .get(`${userUrl}/${userId}`, { headers })
        .then((res) => {
          setUser(res.data.user);
          setUpdate(res.data.user);
          console.log(res.data.user);
        })
        .catch((error) => {
          console.error(error.response ? error.response.data.msg : error);
        });

      axios
        .get(`${orderUrl}/user/${userId}`, { headers })
        .then((res) => {
          setOrders(res.data.orders);
        })
        .catch((error) => {
          console.error(error.response ? error.response.data.msg : error);
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(`Changing ${id} to ${value}`); // Debugging log

    if (
      id === "street" ||
      id === "city" ||
      id === "state" ||
      id === "zip" ||
      id === "country"
    ) {
      setUpdate((prevState) => {
        const newState = {
          ...prevState,
          address: [
            {
              ...prevState.address[0],
              [id]: value,
            },
          ],
        };
        console.log("Updated userUpdate:", newState); // Debugging log
        return newState;
      });
    } else {
      setUpdate({ ...userUpdate, [id]: value });
    }
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordChange({ ...passwordChange, [id]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!user._id) {
        alert("User ID is missing");
        return;
      }
      await axios.put(`${userUrl}/${user._id}`, userUpdate);
      alert("Profile updated successfully");
    } catch (error) {
      console.error(
        "Error during profile update:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to update profile");
    }
    handleClose();
    reload();
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordChange.currentPassword === user.password) {
      if (passwordChange.newPassword !== passwordChange.confirmNewPassword) {
        alert("New passwords do not match.");
        return;
      }

      try {
        const updatedUser = { ...user, password: passwordChange.newPassword };
        await axios.put(`${userUrl}/${user._id}`, updatedUser);
        alert("Password updated successfully");
        setPasswordChange({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        handleClose();
      } catch (error) {
        console.error(
          "Error during password update:",
          error.response ? error.response.data : error.message
        );
        alert("Failed to update password");
      }
    } else {
      alert("Current password is incorrect.");
    }
  };

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to SignOut")) {
      localStorage.removeItem("token"); // Remove the token from local storage
      localStorage.removeItem("cart"); // Remove the token from local storage
      navigate("/"); // Navigate to the home page or login page
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      try {
        await axios.delete(`${url}/${user._id}`, { headers });
        alert("Account deleted successfully");
        localStorage.removeItem("token");
        navigate("/");
      } catch (error) {
        console.error("Error during account deletion:", error);
        alert("Failed to delete account");
      }
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="card bg-white shadow-lg border border-blue-200">
              <div className="card-body">
                <div className="flex items-center justify-center mb-4">
                  <div className="avatar block">
                    <User className="w-12 h-12 text-blue-600 flex items-center justify-center" />
                  </div>
                </div>
                <h2 className="text-center text-lg font-bold text-blue-700">
                  {user.name}
                </h2>
                <div className="mt-4 space-y-2">
                  <button
                    className={`btn ${
                      activeTab === "profile" ? "btn-info" : "btn-outline-info"
                    } w-full justify-start`}
                    onClick={() => handleTabChange("profile")}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Profile Info
                  </button>
                  <button
                    className={`btn ${
                      activeTab === "settings"
                        ? "btn-warning"
                        : "btn-outline-warning"
                    } w-full justify-start`}
                    onClick={() => handleTabChange("settings")}
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </button>
                  <button
                    className={`btn ${
                      activeTab === "orders"
                        ? "btn-warning"
                        : "btn-outline-warning"
                    } w-full justify-start`}
                    onClick={() => handleTabChange("orders")}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Orders
                  </button>
                  <button
                    className="btn btn-outline-error w-full justify-start text-red-600"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Log Out
                  </button>
                  <button
                    className="btn btn-outline-error w-full justify-start text-red-600"
                    onClick={handleDeleteAccount}
                  >
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            <div className="card bg-white shadow-lg border border-blue-200">
              <div className="card-body">
                {activeTab === "profile" && (
                  <div>
                    <h2 className="text-lg font-bold text-blue-700">
                      Profile Information
                    </h2>
                    <form className="space-y-4 mt-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Name</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={userUpdate.name}
                          onChange={handleChange}
                          className="input input-bordered border-blue-300"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={userUpdate.email}
                          onChange={handleChange}
                          className="input input-bordered border-blue-300"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Phone</span>
                        </label>
                        <input
                          type="text"
                          id="phone"
                          placeholder="Phone"
                          value={userUpdate.phone ? userUpdate.phone : ""}
                          onChange={handleChange}
                          className="input input-bordered border-blue-300"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Address</span>
                        </label>
                        <input
                          type="text"
                          id="street"
                          placeholder="Street"
                          value={
                            userUpdate.address && userUpdate.address.length > 0
                              ? userUpdate.address[0].street
                              : ""
                          }
                          onChange={handleChange}
                          className="input input-bordered border-blue-300 mb-2"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            id="city"
                            placeholder="City"
                            value={
                              userUpdate.address &&
                              userUpdate.address.length > 0
                                ? userUpdate.address[0].city
                                : ""
                            }
                            onChange={handleChange}
                            className="input input-bordered border-blue-300"
                          />
                          <input
                            type="text"
                            id="state"
                            placeholder="State"
                            value={
                              userUpdate.address &&
                              userUpdate.address.length > 0
                                ? userUpdate.address[0].state
                                : ""
                            }
                            onChange={handleChange}
                            className="input input-bordered border-blue-300"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <input
                            type="text"
                            id="zip"
                            placeholder="ZIP Code"
                            value={
                              userUpdate.address &&
                              userUpdate.address.length > 0
                                ? userUpdate.address[0].zip
                                : ""
                            }
                            onChange={handleChange}
                            className="input input-bordered border-blue-300"
                          />
                          <input
                            type="text"
                            id="country"
                            placeholder="Country"
                            value={
                              userUpdate.address &&
                              userUpdate.address.length > 0
                                ? userUpdate.address[0].country
                                : ""
                            }
                            onChange={handleChange}
                            className="input input-bordered border-blue-300"
                          />
                        </div>
                      </div>
                      <div className="form-control">
                        <button
                          className="btn btn-info mt-4"
                          onClick={handleUpdate}
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div>
                    <h2 className="text-lg font-bold text-blue-700">Orders</h2>
                    <div className="overflow-x-auto">
                      <table className="table table-zebra">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr
                              key={order._id}
                              onClick={() => handleOrderToggle(order._id)}
                              className="cursor-pointer"
                            >
                              <td>{order._id}</td>
                              <td>
                                {new Date(order.orderDate).toLocaleDateString()}
                              </td>
                              <td>€{order.totalPrice}</td>
                              <td>{order.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {expandedOrderId && (
                      <div className="mt-4">
                        <h3 className="font-semibold">
                          Items in Order {expandedOrderId}:
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="table table-zebra">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders
                                .find((order) => order._id === expandedOrderId)
                                .items.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>€{item.price}</td>
                                    <td>
                                      €{(item.quantity * item.price).toFixed(2)}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "settings" && (
                  <div>
                    <h2 className="text-lg font-bold text-blue-700">
                      Password Settings
                    </h2>
                    <form className="space-y-4 mt-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Current Password</span>
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          value={passwordChange.currentPassword}
                          onChange={handlePasswordChange}
                          className="input input-bordered border-blue-300"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">New Password</span>
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          value={passwordChange.newPassword}
                          onChange={handlePasswordChange}
                          className="input input-bordered border-blue-300"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">
                            Confirm New Password
                          </span>
                        </label>
                        <input
                          type="password"
                          id="confirmNewPassword"
                          value={passwordChange.confirmNewPassword}
                          onChange={handlePasswordChange}
                          className="input input-bordered border-blue-300"
                        />
                      </div>
                      <div className="form-control">
                        <button
                          className="btn btn-warning mt-4"
                          onClick={handlePasswordUpdate}
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
