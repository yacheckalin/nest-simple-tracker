import Navigation from "../../components/navigation";
import OrderList from "../../components/orders-list";

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    orderNumber: string;
    orderId: number;
    trackingNumber: string;
  };
  searchParams: { email: string };
}) {
  return (
    <div>
      <Navigation />
      <OrderList email={searchParams.email} />
    </div>
  );
}
