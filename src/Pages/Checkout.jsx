import { useState } from "react";
export default function Checkout() {
  const [section, setSection] = useState(1);
  return (
    <div className="w-1/2 h-4/6 mx-auto mt-10 p-6 rounded-lg shadow-md">
      <ul className="steps m-10">
        <li
          onClick={() => setSection(1)}
          className={`step ${
            section >= 1 ? "step-primary" : ""
          } cursor-pointer`}
        >
          Personal Information
        </li>
        <li
          onClick={() => setSection(2)}
          className={`step ${
            section >= 2 ? "step-primary" : ""
          } cursor-pointer`}
        >
          Shipping Address
        </li>
        <li
          onClick={() => setSection(3)}
          className={`step ${
            section >= 3 ? "step-primary" : ""
          } cursor-pointer`}
        >
          Payment Method
        </li>
        <li
          onClick={() => setSection(4)}
          className={`step ${
            section >= 4 ? "step-primary" : ""
          } cursor-pointer`}
        >
          Shipping Method
        </li>
      </ul>
      <form>
        {/* Personal Information */}
        <div className={`${section === 1 ? "block" : "hidden"} h-5/6`}>
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg mt-4"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            required
            className="w-full px-4 py-2 border rounded-lg mt-4"
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
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <input
            type="text"
            name="zipCode"
            placeholder="ZIP Code"
            required
            className="w-full px-4 py-2 border rounded-lg mt-4"
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
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            Payment Method
          </h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name="paymentMethod" value="credit" />
              <span>Credit Card</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="paymentMethod" value="paypal" />
              <span>PayPal</span>
            </label>
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mt-4"
            onClick={() => setSection(4)}
          >
            Next
          </button>
        </div>

        {/* Shipping Method */}
        <div className={`${section === 4 ? "block" : "hidden"} h-5/6`}>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            Shipping Method
          </h2>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <input
                  type="radio"
                  name="shipping"
                  value="standard"
                  defaultChecked
                />
                <span className="ml-2">
                  Standard Shipping (3-5 business days)
                </span>
              </div>
              <span>Free</span>
            </label>
            <label className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <input type="radio" name="shipping" value="express" />
                <span className="ml-2">
                  Express Shipping (1-2 business days)
                </span>
              </div>
              <span>$15.00</span>
            </label>
          </div>
        </div>
        {section === 4 && (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Place Order
          </button>
        )}
      </form>
    </div>
  );
}
