"use client";
import { useEffect, useState } from "react";

interface Props {
  email: string;
}

const OrderList: React.FC<Props> = ({ email }) => {
  const [data, setData] = useState([]);

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

  return (
    <div>
      <div>
        {data?.length ? (
          data.map((item: any) => (
            <div key={item.id}>
              {item.id} | {item.orderNumber}
            </div>
          ))
        ) : (
          <div>There is no orders yet!</div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
