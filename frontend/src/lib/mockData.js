export const analyticsData = {
  totalSubscriptions: 1250,
  activeSubscriptions: 1100,
  totalReservations: 3500,
  lifetimeIncome: 75000,
};

export const monthlyData = [
  { name: "Jan", subscriptions: 100, reservations: 300, income: 5000 },
  { name: "Feb", subscriptions: 120, reservations: 350, income: 5500 },
  { name: "Mar", subscriptions: 140, reservations: 400, income: 6000 },
  { name: "Apr", subscriptions: 160, reservations: 450, income: 6500 },
  { name: "May", subscriptions: 180, reservations: 500, income: 7000 },
  { name: "Jun", subscriptions: 200, reservations: 550, income: 7500 },
];

export const messages = [
  {
    id: 1,
    from: "user@example.com",
    subject: "Membership Question",
    date: "2024-05-30",
    read: false,
  },
  {
    id: 2,
    from: "another@example.com",
    subject: "Court Availability",
    date: "2024-05-29",
    read: true,
  },
  {
    id: 3,
    from: "newmember@example.com",
    subject: "Sign Up Process",
    date: "2024-05-28",
    read: false,
  },
];

export const orders = [
  {
    id: 1,
    userName: "John Doe",
    items: [
      { productName: "T-Shirt", quantity: 2, price: 29.99 },
      { productName: "Jeans", quantity: 1, price: 70.01 },
    ],
    totalPrice: 299.97,
    status: "delivered",
    paymentMethod: "Credit Card",
    shippingAddress: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "USA",
    },
    orderDate: new Date("2024-03-15"),
    deliveryDate: new Date("2024-03-20"),
  },
  {
    id: 2,
    userName: "Jane Smith",
    items: [{ productName: "Sneakers", quantity: 1, price: 85.5 }],
    totalPrice: 149.99,
    status: "being delivered",
    paymentMethod: "PayPal",
    shippingAddress: {
      street: "456 Elm St",
      city: "Othertown",
      state: "NY",
      zip: "67890",
      country: "USA",
    },
    orderDate: new Date("2024-03-14"),
  },
  {
    id: 3,
    userName: "Bob Johnson",
    items: [
      { productName: "Backpack", quantity: 1, price: 120.99 },
      { productName: "Water Bottle", quantity: 2, price: 44.99 },
    ],
    totalPrice: 210.97,
    status: "pending",
    paymentMethod: "Debit Card",
    shippingAddress: {
      street: "789 Oak St",
      city: "Sometown",
      state: "TX",
      zip: "54321",
      country: "USA",
    },
    orderDate: new Date("2023-05-03"),
  },
];

export const products = [
  {
    id: "PROD001",
    image: "/placeholder.svg?height=50&width=50",
    name: "Wireless Earbuds",
    brand: "AudioTech",
    price: 79.99,
    stock: 150,
    sold: 50,
  },
  {
    id: "PROD002",
    image: "/placeholder.svg?height=50&width=50",
    name: "Smart Watch",
    brand: "TechWear",
    price: 199.99,
    stock: 75,
    sold: 25,
  },
  {
    id: "PROD003",
    image: "/placeholder.svg?height=50&width=50",
    name: "Bluetooth Speaker",
    brand: "SoundMaster",
    price: 59.99,
    stock: 100,
    sold: 30,
  },
  {
    id: "PROD004",
    image: "/placeholder.svg?height=50&width=50",
    name: "4K Action Camera",
    brand: "AdventureCam",
    price: 249.99,
    stock: 50,
    sold: 15,
  },
  {
    id: "PROD005",
    image: "/placeholder.svg?height=50&width=50",
    name: "Noise-Cancelling Headphones",
    brand: "AudioTech",
    price: 299.99,
    stock: 80,
    sold: 40,
  },
];
