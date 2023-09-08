"use client";

import { useEffect, useState } from "react";
import { OrderI } from "../../types/model.types";

interface Props {
  id: string;
}

const OrderDetails: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<OrderI | null>();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setData(null);
      }

      const response = await fetch(`http://localhost:3000/orders/${id}`);
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
  return <div>ORDER DETAILS HERE ... {data && data?.id}</div>;
};

export default OrderDetails;
