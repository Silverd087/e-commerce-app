import OrderTable from "../components/OrderTable";

export default function OrderSection() {
  return (
    <section id="orders" className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <OrderTable />
    </section>
  );
}
