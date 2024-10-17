import React from "react";
import SchedData from "./SchedData.jsx";

export default function Schedule() {
  return (
    <div className="bg-white w-full h-fit rounded-md bg-opacity-85 mt-2 shadow-slate-500 shadow-sm p-4">
      <div className="flex items-center gap-2">
        <h1 className="font-semibold text-lg">Schedule For:</h1>
        <select className="rounded-lg" name="schedule" id="schedule">
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>

      <h1 className="font-bold text-lg">Laboratory</h1>

      <div className="overflow-x-auto w-full h-fit">
        <SchedData>LAB-201</SchedData>
        <SchedData>LAB-202</SchedData>
        <SchedData>LAB-203</SchedData>
        <SchedData>LAB-204</SchedData>
        <SchedData>LAB-205</SchedData>
        <SchedData>LAB-IoT</SchedData>
      </div>
    </div>
  );
}
