/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { OrderI } from "../../types/model.types";
import moment from "moment";

interface Props {
  id: string;
}

const OrderDetails: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<OrderI | null>();
  const [articles, setArticles] = useState<[]>();

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
      return result;
    };

    const fetchArticles = async (data: OrderI) => {
      if (data && data.trackingNumber) {
        const response = await fetch(
          `http://localhost:3000/orders/get-articles/${data.trackingNumber}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setArticles(result);
      }
    };

    try {
      fetchData().then((res) => fetchArticles(res));
    } catch (e) {
      console.log(`An error occured while fetching the data: ${e}`);
    }
  }, []);

  return data ? (
    <section className="dark:bg-gray-800 dark:text-gray-100">
      <div className="container max-w-5xl px-4 py-12 mx-auto">
        <div className="grid gap-4 mx-4 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-3">
            <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-violet-400">
              <h3 className="text-3xl font-semibold">{data?.orderNumber}</h3>
              <span className="text-sm font-bold tracki uppercase dark:text-gray-400">
                {`${data.street} ${data.zipCode} ${data.city}`}
              </span>
            </div>
            <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-violet-400">
              <h3 className="text-3xl font-semibold">Tracking #</h3>
              <span className="text-sm font-bold tracki uppercase dark:text-gray-400">
                {data.trackingNumber}
              </span>
            </div>
          </div>
          <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
            <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-700">
              {data.checkpoints.length ? (
                data.checkpoints.map(
                  ({
                    id,
                    location,
                    timestamp,
                    status,
                    statusText,
                    statusDetail,
                  }) => (
                    <div
                      key={id}
                      className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-400"
                    >
                      <h3 className="text-xl font-semibold tracki">
                        {statusText}
                      </h3>
                      <span className="text-xs group-hover:underline dark:text-gray-100">
                        {location}
                      </span>
                      <time className="text-xs tracki uppercase dark:text-gray-400">
                        {moment(timestamp).format("MMMM Do YYYY, h:mm:ss a")}
                      </time>
                      <p className="mt-3">{statusDetail}</p>
                    </div>
                  )
                )
              ) : (
                <div>No tracking data yet!</div>
              )}
            </div>
          </div>
          {articles && articles.length ? (
            <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
              <section className="mb-32">
                <h5 className="mb-10 text-center text-xl font-semibold md:mb-6">
                  Articles
                </h5>
                {articles?.map(
                  ({
                    orderNumber,
                    quantity,
                    articleNumber,
                    articleImageUrl,
                    productName,
                  }) => (
                    <div className="mb-12 flex flex-wrap md:mb-0" key={id}>
                      <div className="w-full md:w-2/12 shrink-0 grow-0 basis-auto">
                        <img
                          src={articleImageUrl}
                          className="mb-6 w-full rounded-lg shadow-lg dark:shadow-black/20"
                          alt={productName}
                        />
                      </div>

                      <div className="w-full md:w-10/12 shrink-0 grow-0 basis-auto md:pl-6">
                        <p className="mb-3 font-semibold">
                          {articleNumber} x {quantity}
                        </p>
                        <p>{productName}</p>
                        <p>OrderNo: {orderNumber}</p>
                      </div>
                    </div>
                  )
                )}
              </section>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  ) : (
    <section>There is no data yet!</section>
  );
};

export default OrderDetails;
