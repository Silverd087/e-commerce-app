import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useCart } from "../../../Context/CartContext";
import CartSummary from "../../../Components/common/cart/CartSummary";
import { CART_ACTIONS } from "../../../Context/cartConstants";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const orderUrl = "https://sbabeetbackend.onrender.com/api/orders";
  const userUrl = "https://sbabeetbackend.onrender.com/api/users";
  const productUrl = "https://sbabeetbackend.onrender.com/api/products";
  const [section, setSection] = useState(1);
  const { state: cartState, dispatch } = useCart();
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    user: {
      _id: "",
      name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
    },
    items: [],
    totalPrice: 0,
    status: "pending",
    paymentMethod: "",
    orderDate: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to login to make an order");
    } else {
      const decoded = jwtDecode(token);
      const id = decoded.id;
      axios
        .get(`${userUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setOrder({
            ...order,
            user: {
              ...order.user,
              name: response.data.user.name,
              email: response.data.user.email,
              phone: response.data.user.phone,
              _id: response.data.user._id,
              address: response.data.user.address[0],
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id.startsWith("user.address.")) {
      const addressField = id.split(".")[2];
      setOrder({
        ...order,
        user: {
          ...order.user,
          address: {
            ...order.user.address,
            [addressField]: value,
          },
        },
      });
    } else if (id.startsWith("user.phone")) {
      setOrder({
        ...order,
        user: {
          ...order.user,
          phone: value,
        },
      });
    } else {
      setOrder({
        ...order,
        [id]: value,
      });
    }
    console.log(order);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      order.user.name,
      order.user.email,
      order.user.phone,
      order.user.address.street,
      order.user.address.city,
      order.user.address.state,
      order.user.address.zip,
      order.paymentMethod,
    ];

    const allFieldsFilled = requiredFields.every((field) => field);

    if (!allFieldsFilled) {
      alert("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = jwtDecode(token).id;
    const updatedOrder = {
      user: {
        _id: userId,
        name: order.user.name,
        email: order.user.email,
        phone: order.user.phone,
        address: {
          street: order.user.address.street,
          city: order.user.address.city,
          state: order.user.address.state,
          zip: order.user.address.zip,
        },
      },
      items: cartState.items.map((item) => ({
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        totalPrice: item.price * item.quantity,
      })),
      totalPrice: cartState.totalPrice,
      status: "pending",
      paymentMethod: order.paymentMethod,
      orderDate: new Date(),
    };

    axios
      .post(orderUrl, updatedOrder)
      .then((response) => {
        alert(response.data.msg);
        dispatch({ type: CART_ACTIONS.CLEAR_CART });

        cartState.items.forEach((item) => {
          const updatedProduct = {
            stock: item.stock - item.quantity,
            sold: item.sold + item.quantity,
          };

          console.log("Updating product:", item._id, updatedProduct);

          axios
            .put(`${productUrl}/update-stock-sold/${item._id}`, updatedProduct)
            .then((res) => {
              console.log(`Updated product: ${item._id}`, res.data);
            })
            .catch((error) => {
              console.error(`Error updating product ${item._id}:`, error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .put(`${userUrl}/${userId}`, updatedOrder.user)
      .then((response) => {
        console.log(response.data.msg);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/profile");
  };

  return (
    <div className="w-1/2 h-4/6 mx-auto my-20 p-6 rounded-lg shadow-md bg-white">
      {/* Cart Summary */}
      <CartSummary items={cartState.items} totalPrice={cartState.totalPrice} />

      <ul className="steps m-10">
        <li
          onClick={() => setSection(1)}
          className={`step ${
            section >= 1 ? "step-primary" : ""
          } cursor-pointer text-black`}
        >
          Personal Information
        </li>
        <li
          onClick={() => setSection(2)}
          className={`step ${
            section >= 2 ? "step-primary" : ""
          } cursor-pointer text-black`}
        >
          Shipping Address
        </li>
        <li
          onClick={() => setSection(3)}
          className={`step ${
            section >= 3 ? "step-primary" : ""
          } cursor-pointer text-black`}
        >
          Payment Method
        </li>
      </ul>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className={`${section === 1 ? "block" : "hidden"} h-5/6`}>
          <h2 className="text-xl font-semibold mb-4 text-black">
            Personal Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="full name"
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border rounded-lg bg-[#EFF3F6]"
              id="user.name"
              value={order.user.name}
              onChange={handleChange}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg mt-4 bg-[#EFF3F6]"
            id="user.email"
            value={order.user.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            required
            className="w-full px-4 py-2 border rounded-lg mt-4 bg-[#EFF3F6]"
            id="user.phone"
            value={order.user.phone}
            onChange={handleChange}
          />
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mt-4"
            onClick={() => setSection(2)}
          >
            Next
          </button>
        </div>

        {/* Shipping Address */}
        <div className={`${section === 2 ? "block" : "hidden"} h-5/6`}>
          <h2 className="text-xl font-semibold mb-4 text-black">
            Shipping Address
          </h2>
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            required
            className="w-full px-4 py-2 border rounded-lg bg-[#EFF3F6]"
            id="user.address.street"
            value={order.user.address?.street || ""}
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              required
              className="w-full px-4 py-2 border rounded-lg bg-[#EFF3F6]"
              id="user.address.city"
              value={order.user.address?.city || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              required
              className="w-full px-4 py-2 border rounded-lg bg-[#EFF3F6]"
              id="user.address.state"
              value={order.user.address?.state || ""}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="zipCode"
            placeholder="ZIP Code"
            required
            className="w-full px-4 py-2 border rounded-lg mt-4 bg-[#EFF3F6]"
            id="user.address.zip"
            value={order.user.address?.zip || ""}
            onChange={handleChange}
          />
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mt-4"
            onClick={() => setSection(3)}
          >
            Next
          </button>
        </div>

        {/* Payment Method */}
        <div className={`${section === 3 ? "block" : "hidden"} h-5/6`}>
          <h2 className="text-xl font-semibold mb-4 text-black">
            Payment Method
          </h2>
          <select
            className="w-full px-4 py-2 border rounded-lg bg-[#EFF3F6]"
            id="paymentMethod"
            onChange={handleChange}
            value={order.paymentMethod}
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 mt-4"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
