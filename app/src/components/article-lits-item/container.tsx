/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
"use client";

import { memo } from "react";
import { ArticleI } from "../../types/model.types";

const ArticleItem: React.FC<ArticleI> = memo(
  ({
    id,
    orderNumber,
    quantity,
    articleImageUrl,
    articleNumber,
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
);

export default ArticleItem;
