import React, { useState } from "react";
import SchedData from "./SchedData.jsx";

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  // const handleGetInstructorList = async () => {
  //   const response = await window.api.getScheduleWithInstructorForAttendance();
  //   if (response.success) {
  //     setInstructorList(response.instructors); // Update the state with the fetched schedule list
  //   } else {
  //     setInfoMessage("Failed to load Schedule."); // Update the message in case of an error
  //   }
  // };

  return (
    <div className="bg-white max-w-7xl mx-auto w-full h-fit rounded-md bg-opacity-85 mt-4 shadow-xl p-6">
      {/* <div className="flex items-center gap-4 mb-6">
        <h1 className="font-semibold text-xl text-gray-800">Schedule For:</h1>
        <select
          className=" w-40 rounded-lg border-2 border-gray-300 p-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          name="schedule"
          id="schedule"
          value={selectedDay}
          onChange={handleDayChange}
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div> */}

      <h2 className="font-bold text-2xl text-gray-800 mb-4">Laboratory Schedule</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SchedData lab="LAB-201" />
        <SchedData lab="LAB-202" />
        <SchedData lab="LAB-203" />
        <SchedData lab="LAB-204" />
        <SchedData lab="LAB-205" />
        <SchedData lab="LAB-IoT" />
      </div>
    </div>
  );
}
