import { Users, Calendar, Euro, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AnalyticsCards({ users }) {
  const [lifetimeIncome, setLifetimeIncome] = useState(0);

  useEffect(() => {
    const fetchLifetimeIncome = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/orders/lifetime-income"
        );
        setLifetimeIncome(response.data.lifetimeIncome);
      } catch (error) {
        console.error("Error fetching lifetime income:", error);
      }
    };

    fetchLifetimeIncome();
  }, []);

  const cardConfig = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
    },
    {
      title: "Lifetime Income",
      value: `€ ${lifetimeIncome.toLocaleString()}`,
      icon: Euro,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cardConfig.map((card, index) => (
        <div
          key={index}
          className="card bg-base-100 border-2 border-primary/10 hover:border-secondary/30 transition-colors"
        >
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <h3 className="card-title text-sm font-medium text-primary">
                {card.title}
              </h3>
              <card.icon className="w-4 h-4 text-secondary" />
            </div>
            <p className="text-2xl font-bold text-primary">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
