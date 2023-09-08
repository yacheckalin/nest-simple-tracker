"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderI } from "../../types/model.types";

interface Props {
  email: string;
}

const OrderList: React.FC<Props> = ({ email }) => {
  const [data, setData] = useState<OrderI[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!email) {
        setData([]);
      }
      const response = await fetch("http://localhost:3000/orders/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    };

    fetchData().catch((e) => {
      console.log(`An error occured while fetching the data: ${e}`);
    });
  }, []);

  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/orders/${id}`);
  };

  return (
    <div className="h-screen">
      {data?.length ? (
        data.map((item: any) => (
          <div
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto"
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            <div>
              <span>Order Number:</span>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item?.orderNumber}
              </h5>

              <span>Delivery Address</span>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item?.street} | {item?.zipCode} | {item?.city}
              </h5>

              <span>Current Status</span>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item?.checkpoints[0]?.status}
              </h5>
            </div>
          </div>
        ))
      ) : (
        <div>There is no orders yet!</div>
      )}
    </div>
  );
};

export default OrderList;
