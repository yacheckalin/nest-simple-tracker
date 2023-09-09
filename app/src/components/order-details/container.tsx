/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { OrderI } from "../../types/model.types";
import CheckpointItem from "../checkpoint-item";
import { useFetch } from "../../hooks/fetch";
import ArticlesList from "../articles-list";
import Loader from "../loader";
import ErrorComponent from "../error-cover/container";

interface Props {
  id: string;
}

const OrderDetails: React.FC<Props> = ({ id }) => {
  const [trackingNumber, setTrackingNumber] = useState<string>("");

  const { data, isPending, error } = useFetch<OrderI>(
    `http://localhost:3000/orders/${id}`,
    "GET"
  );

  useEffect(() => {
    if (data && data?.trackingNumber) {
      setTrackingNumber(data.trackingNumber);
    }
  }, [data]);

  return (
    data && (
      <section className="dark:bg-gray-800 dark:text-gray-100">
        {isPending && <Loader />}
        {error && <ErrorComponent error={error} />}
        {!error && (
          <div className="container max-w-5xl px-4 py-12 mx-auto">
            <div className="grid gap-4 mx-4 sm:grid-cols-12">
              <div className="col-span-12 sm:col-span-3">
                <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-violet-400">
                  <h3 className="text-3xl font-semibold">
                    {data?.orderNumber}
                  </h3>
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
                  {data.checkpoints?.length ? (
                    data.checkpoints.map((props) => (
                      <CheckpointItem key={props.id} {...props} />
                    ))
                  ) : (
                    <div>No tracking data yet!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {trackingNumber && <ArticlesList trackingNumber={trackingNumber} />}
      </section>
    )
  );
};

export default OrderDetails;
