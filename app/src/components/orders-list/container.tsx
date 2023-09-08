/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
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
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
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
            {data.length ? (
              data.map(
                ({
                  id,
                  orderNumber,
                  trackingNumber,
                  checkpoints,
                  courier,
                  street,
                  zipCode,
                  city,
                  articleNumber,
                  articleImageUrl,
                  quantity,
                  productName,
                }) => (
                  <tr
                    className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900 hover:dark:bg-gray-700 focus:dark:bg-gray-700"
                    key={id}
                    onClick={() => handleClick(id)}
                  >
                    <td className="p-3">
                      <p>{id}</p>
                    </td>
                    <td className="p-3">
                      <p>{orderNumber}</p>
                    </td>
                    <td className="p-3">
                      <p>{`${street} ${zipCode} ${city}`}</p>
                    </td>
                    <td className="p-3">
                      <p>{trackingNumber}</p>
                    </td>
                    <td className="p-3">
                      <p>{courier}</p>
                    </td>
                    <td className="p-3">
                      <p>{articleNumber}</p>
                    </td>
                    <td className="p-3">
                      <p>{quantity}</p>
                    </td>
                    <td className="p-5 center">
                      <p>
                        {articleImageUrl ? (
                          <img
                            src={articleImageUrl}
                            className="object-cover w-10 h-10 rounded-full shadow dark:bg-gray-500"
                          />
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </p>
                    </td>
                    <td className="p-3">
                      <p>{productName}</p>
                    </td>

                    <td className="p-3 text-right">
                      {checkpoints.length ? (
                        <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
                          <span>{checkpoints[0]?.status}</span>
                        </span>
                      ) : null}
                    </td>
                  </tr>
                )
              )
            ) : (
              <p className="p-3">There is no orders yet!</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
