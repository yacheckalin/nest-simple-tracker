/* eslint-disable react/display-name */
"use client";

import { useRouter } from "next/navigation";
import { OrderI } from "../../types/model.types";
import React from "react";

const OrderListItem: React.FC<OrderI> = React.memo(
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
  }) => {
    const router = useRouter();
    const onClickRow = (id: number) => {
      router.push(`/orders/${id}`);
    };

    return (
      <tr
        className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900 hover:dark:bg-gray-700 focus:dark:bg-gray-700"
        key={id}
        onClick={() => onClickRow(id)}
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
          {checkpoints && checkpoints.length ? (
            <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
              <span>{checkpoints[0]?.status}</span>
            </span>
          ) : null}
        </td>
      </tr>
    );
  }
);

export default OrderListItem;
