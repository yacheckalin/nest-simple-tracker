/* eslint-disable react/display-name */
"use client";

import moment from "moment";
import { CheckpointI } from "../../types/model.types";
import { memo } from "react";

const CheckpointItem: React.FC<CheckpointI> = memo(
  ({ statusText, location, timestamp, statusDetail }) => {
    return (
      <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-400">
        <h3 className="text-xl font-semibold tracki">{statusText}</h3>
        <span className="text-xs group-hover:underline dark:text-gray-100">
          {location}
        </span>
        <time className="text-xs tracki uppercase dark:text-gray-400">
          {moment(timestamp).format("MMMM Do YYYY, h:mm:ss a")}
        </time>
        <p className="mt-3">{statusDetail}</p>
      </div>
    );
  }
);

export default CheckpointItem;
