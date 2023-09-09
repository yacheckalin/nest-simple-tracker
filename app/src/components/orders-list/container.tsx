/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, memo } from "react";
import { OrderI } from "../../types/model.types";
import OrderListItem from "../order-list-item";
import { useFetch } from "../../hooks/fetch";
import ErrorComponent from "../error-cover/container";
import Loader from "../loader";

interface Props {
  email: string;
}

const OrderList: React.FC<Props> = memo(({ email }) => {
  // const [data, setData] = useState<OrderI[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!email) {
  //       setData([]);
  //     }
  //     const response = await fetch("http://localhost:3000/orders/filter", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email }),
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const result = await response.json();
  //     setData(result);
  //   };

  //   fetchData().catch((e) => {
  //     console.log(`An error occured while fetching the data: ${e}`);
  //   });
  // }, []);

  const { data, isPending, error } = useFetch<OrderI[]>(
    "http://localhost:3000/orders/filter",
    "POST",
    { email }
  );

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
      {isPending && <Loader />}
      {error && <ErrorComponent error={error} />}
      {!error && data && data.length && (
        <>
          <h2 className="mb-4 text-2xl font-semibold leadi">Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col className="w-24" />
              </colgroup>
              <thead className="dark:bg-gray-700">
                <tr className="text-left">
                  <th className="p-3">Id</th>
                  <th className="p-3">Order #</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Tracking #</th>
                  <th className="p-3">Courier</th>
                  <th className="p-3">Article #</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Thumbnail</th>
                  <th className="p-3">Product Name </th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((props) => (
                  <OrderListItem {...props} key={props.id} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
});

export default OrderList;
