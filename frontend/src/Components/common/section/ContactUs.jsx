import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import axios from "axios";

export default function ContactUs() {
  const url = "http://localhost:5001/api/messages";
  const [message, setMessage] = useState({
    name: "",
    from: "",
    message: "",
    date: "",
    read: false,
  });
  const handleChange = (e) => {
    setMessage({ ...message, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !message.name.trim() ||
      !message.from.trim() ||
      !message.message.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    const messageToSend = {
      ...message,
      date: formattedDate,
    };

    console.log("Sending message:", messageToSend);

    axios
      .post(url, messageToSend)
      .then((response) => {
        console.log("Response:", response.data);
        alert("Message sent successfully!");
        setMessage({
          name: "",
          from: "",
          message: "",
          date: "",
          read: false,
        });
      })
      .catch((error) => {
        console.log("Error details:", error.response?.data);
        alert("Failed to send message");
      });
  };
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-black p-3 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-black p-3 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">support@shoepreme.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-black p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Address</h3>
                  <p className="text-gray-600">
                    123 Shoe Street, Fashion District
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Your name"
                  id="name"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Your email"
                  id="from"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                  rows={4}
                  placeholder="Your message"
                  id="message"
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
