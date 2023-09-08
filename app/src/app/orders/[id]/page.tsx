import Navigation from "../../../components/navigation";
import OrderDetails from "../../../components/order-details";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <Navigation />
      <OrderDetails id={params.id} />
    </div>
  );
}
