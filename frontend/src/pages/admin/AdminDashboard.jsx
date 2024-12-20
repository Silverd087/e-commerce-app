import { useEffect, useState } from "react";
import AnalyticsSection from "../../Components/admin/section/AnalyticsSection";
import MessagesSection from "../../Components/admin/section/MessageSection";
import OrderSection from "../../Components/admin/section/OrderSection";
import ProductSection from "../../Components/admin/section/ProductSection";
import Sidebar from "../../Components/admin/layout/Sidebar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
export default function AdminDashboard() {
  const userUrl = "https://sbabeetbackend.onrender.com/api/users";
  const [userId, setUserId] = useState(null); // Use state for userId
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
    if (userId) {
      const fetchUser = async () => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        await axios
          .get(`${userUrl}/${userId}`, { headers })
          .then((res) => {
            setUser(res.data.user);
          })
          .catch((error) => {
            console.error(error.response.data.msg);
          });
      };
      fetchUser();
    }
  }, []);
  return (
    <div className="flex h-screen bg-[#4169E1]/5">
      <Sidebar user={user} />
      <div className="flex-1 overflow-y-auto p-8 bg-white">
        <div className="space-y-8">
          <AnalyticsSection />
          <OrderSection />
          <MessagesSection user={user} />
          <ProductSection />
        </div>
      </div>
    </div>
  );
}
