import React, { children } from "react";

export default function SchedData({children}) {
  return (
    <div className="border-dashed rounded-lg border-2 border-red-300  h-fit my-1 p-1">
      <h1 className="bg-white p-2 rounded-lg w-fit font-semibold">{children}</h1>
    </div>
  );
}
