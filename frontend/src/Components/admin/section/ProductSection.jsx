import ProductTable from "../components/ProductTable";

export default function ProductSection() {
  return (
    <section id="products" className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <ProductTable />
    </section>
  );
}
