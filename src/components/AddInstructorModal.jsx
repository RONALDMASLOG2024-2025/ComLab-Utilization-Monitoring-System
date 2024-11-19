import React, { useState, useEffect } from "react";

export default function AddInstructorModal() {
  const [scheduleList, setScheduleList] = useState([]); // Correctly initialize with an empty array
  const [message, setMessage] = useState(""); // Add this if `setMessage` is used elsewhere

  useEffect(() => {
    handleGetSchedule(); // Fetch schedules on component mount
  }, []);

  const handleGetSchedule = async () => {
    const response = await window.api.getSchedule();
    if (response.success) {
      setScheduleList(response.schedules); // Update the state with the fetched schedule list
    } else {
      setMessage("Failed to load Schedule."); // Update the message in case of an error
    }
  };

  return (
    <div>
      <h1>Instructor Schedules</h1>
      {/* Render the schedule list */}
      {scheduleList.length > 0 ? (
        scheduleList.map((sched) => <p key={sched.instructor_ID}>{sched.id}</p>)
      ) : (
        <p>HELLO WALA</p>
      )}
    </div>
  );
}
