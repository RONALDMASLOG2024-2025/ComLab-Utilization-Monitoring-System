import React, { useEffect, useState } from "react";

export default function Schedule() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [instructor, setInstructor] = useState("");
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [lab, setLab] = useState("");
  const [filter, setFilter] = useState("");
  const [infoMessage, setInfoMessage] = useState(""); // For displaying success/error messages

  const [scheduleList, setScheduleList] = useState([]); // Correctly initialize with an empty array
  const [message, setMessage] = useState(""); // Add this if `setMessage` is used elsewhere
  const [instructorList, setInstructorList] = useState([]);
  const [schedIDForEdit, setSchedIDForEdit] = useState();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    resetStateForm();
  };

  const toggleModalEdit = () => {
    setIsModalEdit(!isModalEdit);
  };

  const handleCha = () => {
    setInfoMessage(days.Friday ? "TRUE" : "FALSE");
  };

  const handleInsertSchedule = async () => {
    const scheduleData = {
      instructor_ID: instructor,
      subject,
      start_time: startTime,
      end_time: endTime,
      days: days,
      lab,
    };

    handleCha();

    try {
      const result = await window.api.insertSchedule(scheduleData); // IPC call to insert schedule
      handleGetSchedule();
      setInfoMessage(result.message); // Success message
    } catch (error) {
      setInfoMessage(error.message); // Error message
    }

    toggleModal();
  };

  const handleDayChange = (day) => {
    setDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  useEffect(() => {
    handleGetInstructorList();
    handleGetSchedule(); // Fetch schedules on component mount
  }, []);

  const handleGetSchedule = async () => {
    const response = await window.api.getSchedule();
    if (response.success) {
      setScheduleList(response.schedules); // Update the state with the fetched schedule list
    } else {
      setInfoMessage("Failed to load Schedule."); // Update the message in case of an error
    }
  };

  const handleGetInstructorList = async () => {
    const response = await window.api.getInstructors();
    if (response.success) {
      setInstructorList(response.instructors); // Update the state with the fetched schedule list
    } else {
      setInfoMessage("Failed to load Schedule."); // Update the message in case of an error
    }
  };

  const handleDeleteSchedule = async (schedule_ID) => {
    const response = await window.api.deleteSchedule(schedule_ID);
    if (response.success) {
      setInfoMessage("Schedule deleted successfully!");
      handleGetSchedule();
    } else {
      setInfoMessage(
        response.message || "An error occurred while deleting the instructor."
      );
    }
  };

  useEffect(() => {
    if (infoMessage) {
      const timer = setTimeout(() => {
        setInfoMessage("");
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount or when message changes
    }
  }, [infoMessage]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount or when message changes
    }
  }, [message]);

  const convertTo12HourFormat = (time) => {
    let [hours, minutes] = time.split(":"); // Split the time into hours and minutes
    hours = parseInt(hours, 10); // Convert hours to integer

    const period = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
    hours = hours % 12 || 12; // Convert to 12-hour format, ensure 12 PM and 12 AM are handled correctly
    minutes = minutes.padStart(2, "0"); // Ensure minutes are 2 digits (e.g., '05' instead of '5')

    return `${hours}:${minutes} ${period}`;
  };

  //UPDATEEEEEEEEEEEEEEEEEEEEEEE

  // const handleUpdateSubmit = async (e) => {
  //   if (!firstName || !lastName || !email || !gender || !rfid || !exID) {
  //     setMessage("All fields are required.");
  //     return;
  //   }

  //   const updatedData = {};
  //   const schedule_id = 1;

  //   const response = await window.api.updateSchedule(schedule_id, updatedData);
  //   if (response.success) {
  //     setMessage("Instructor updated successfully!");

  //     toggleModalEdit();
  //     handleGetSchedule();
  //   } else {
  //     setMessage(
  //       response.message || "An error occurred while updating the instructor."
  //     );
  //   }
  // };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate required fields
    if (!startTime || !endTime || !subject || !instructor || !lab) {
      setMessage("All fields are required.");
      return;
    }

    // Construct the updated data object with flat day properties
    const updatedData = {
      start_time: startTime,
      end_time: endTime,
      subject: subject,
      instructor_ID: instructor,
      lab: lab,
      monday: days.monday ? 1 : 0,
      tuesday: days.tuesday ? 1 : 0,
      wednesday: days.wednesday ? 1 : 0,
      thursday: days.thursday ? 1 : 0,
      friday: days.friday ? 1 : 0,
      saturday: days.saturday ? 1 : 0,
      sunday: days.sunday ? 1 : 0,
    };

    try {
      // Mock schedule_id for example; replace with actual ID as needed
      const schedule_id = schedIDForEdit;

      // Call the updateSchedule API
      const response = await window.api.updateSchedule(
        schedule_id,
        updatedData
      );

      if (response.success) {
        setMessage("Schedule updated successfully!");
        toggleModalEdit(); // Close the modal
        resetStateForm();
        handleGetSchedule(); // Refresh the schedule list
      } else {
        setMessage(
          response.message || "An error occurred while updating the schedule."
        );
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  const handleEditModal = (instructor) => {
    toggleModalEdit();
    handleGetInstructorList();
    setEndTime(instructor.end_time);
    setStartTime(instructor.start_time);
    setSubject(instructor.subject);
    setInstructor(instructor.instructor_ID);
    setDays({
      monday: instructor.monday !== 0,
      tuesday: instructor.tuesday !== 0,
      wednesday: instructor.wednesday !== 0,
      thursday: instructor.thursday !== 0,
      friday: instructor.friday !== 0,
      saturday: instructor.saturday !== 0,
      sunday: instructor.sunday !== 0,
    });
    setLab(instructor.lab);
    setSchedIDForEdit(instructor.id);
  };

  const resetStateForm = () => {
    setEndTime("");
    setStartTime("");
    setSubject("");
    setInstructor("");
    setDays({
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    });
    setLab("");
    setSchedIDForEdit("");
  };

  return (
    <div className="bg-white w-full  max-h-full rounded-lg bg-opacity-85 mt-2 shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-2 justify-center mb-4">
        <h1 className="font-bold text-2xl text-gray-700">Schedule</h1>
      </div>

      {/* Controls: Add button and search */}
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none"
          onClick={toggleModal}
        >
          Add Schedule
        </button>
        <input
          type="search"
          placeholder="Search"
          className="p-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Info Message */}
      {infoMessage && (
        <div className="text-center text-green-600 mb-4">{infoMessage}</div>
      )}

      {/* Table */}
      <div className="overflow-x-auto max-w-full">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full table-auto border border-gray-200 bg-white shadow-sm rounded-lg">
            <thead className="sticky z-0 top-0 bg-gray-100 ">
              <tr className="text-gray-600 uppercase text-xs leading-normal">
                <th className="py-2 px-3 border-b text-center">Instructor</th>
                <th className="py-2 px-3 border-b text-center">Subject</th>
                <th className="py-2 px-3 border-b text-center">
                  Time Duration
                </th>
                <th className="py-2 px-3 border-b text-center">Day Schedule</th>
                <th className="py-2 px-3 border-b text-center">Laboratory</th>
                <th className="py-2 px-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scheduleList?.length > 0 ? (
                scheduleList?.map((sched) => (
                  <tr key={sched.id} className="hover:bg-gray-50 text-gray-700">
                    <td className="py-2 px-3 border-b text-center">
                      {sched.firstName} {sched.lastName}
                    </td>
                    <td className="py-2 px-3 border-b text-center">
                      {sched.subject}
                    </td>
                    <td className="py-2 px-3 border-b text-center">
                      {convertTo12HourFormat(sched.start_time)} -{" "}
                      {convertTo12HourFormat(sched.end_time)}
                    </td>
                    <td className="py-2 px-3 border-b text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {sched.monday !== 0 && (
                          <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded-full text-xs">
                            Monday
                          </span>
                        )}
                        {sched.tuesday !== 0 && (
                          <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded-full text-xs">
                            Tuesday
                          </span>
                        )}
                        {sched.wednesday !== 0 && (
                          <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded-full text-xs">
                            Wednesday
                          </span>
                        )}
                        {sched.thursday !== 0 && (
                          <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded-full text-xs">
                            Thursday
                          </span>
                        )}
                        {sched.friday !== 0 && (
                          <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded-full text-xs">
                            Friday
                          </span>
                        )}
                        {sched.saturday !== 0 && (
                          <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded-full text-xs">
                            Saturday
                          </span>
                        )}
                        {sched.sunday !== 0 && (
                          <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded-full text-xs">
                            Sunday
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-3 border-b text-center">
                      {sched.lab}
                    </td>
                    <td className="py-2 px-3 border-b text-center">
                      <button
                        onClick={() => handleEditModal(sched)}
                        className="px-2 py-1 text-white bg-yellow-500 rounded-md shadow hover:bg-yellow-600 focus:outline-none mr-1 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSchedule(sched.id)}
                        className="px-2 py-1 text-white bg-red-500 rounded-md shadow hover:bg-red-600 focus:outline-none text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-3 px-4 text-center text-gray-500"
                  >
                    No schedules available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add Schedule */}
      {isModalOpen && (
        <div className="rounded-lg fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white mt-10 rounded-lg shadow-lg p-6 w-full max-w-lg mx-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Add Schedule
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {/* Instructor Selector */}
              <select
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <option value="">Select Instructor</option>
                {instructorList?.length !== 0
                  ? instructorList?.map((instructor) => (
                      <option value={instructor.instructor_ID}>
                        {instructor.firstName + " " + instructor.lastName}
                      </option>
                    ))
                  : null}
              </select>

              {/* Subject Input */}
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />

              {/* Time Duration */}
              <div className="flex gap-4">
                <label
                  className="align-middle items-center"
                  htmlFor="startTime"
                >
                  Start Time:
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                />
                <label
                  className="align-middle items-center"
                  htmlFor="startTime"
                >
                  End Time:
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                />
              </div>

              {/* Day Schedule Checkboxes */}
              <div className="grid grid-cols-4 gap-2">
                {Object.keys(days).map((day) => (
                  <label key={day} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={days[day]}
                      onChange={() => handleDayChange(day)}
                      className="h-4 w-4 text-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    />
                    {day}
                  </label>
                ))}
              </div>

              {/* Laboratory Selector */}
              <select
                value={lab}
                onChange={(e) => setLab(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <option value="">Select Laboratory</option>
                <option value="LAB-201">LAB-201</option>
                <option value="LAB-202">LAB-202</option>
                <option value="LAB-203">LAB-203</option>
                <option value="LAB-204">LAB-204</option>
                <option value="LAB-205">LAB-205</option>
                <option value="LAB-IoT">LAB-IoT</option>
              </select>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                  onClick={handleInsertSchedule}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isModalEdit && (
        <div className="rounded-lg fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white mt-10 rounded-lg shadow-lg p-6 w-full max-w-lg mx-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Edit Schedule
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {/* Instructor Selector */}
              <select
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <option value="">Select Instructor</option>
                {instructorList?.length !== 0
                  ? instructorList?.map((instructor) => (
                      <option value={instructor.instructor_ID}>
                        {instructor.firstName + " " + instructor.lastName}
                      </option>
                    ))
                  : null}
              </select>

              {/* Subject Input */}
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />

              {/* Time Duration */}
              <div className="flex gap-4">
                <label
                  className="align-middle items-center"
                  htmlFor="startTime"
                >
                  Start Time:
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                />
                <label
                  className="align-middle items-center"
                  htmlFor="startTime"
                >
                  End Time:
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                />
              </div>

              {/* Day Schedule Checkboxes */}
              <div className="grid grid-cols-4 gap-2">
                {Object.keys(days).map((day) => (
                  <label key={day} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={days[day]}
                      onChange={() => handleDayChange(day)}
                      className="h-4 w-4 text-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    />
                    {day}
                  </label>
                ))}
              </div>

              {/* Laboratory Selector */}
              <select
                value={lab}
                onChange={(e) => setLab(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <option value="">Select Laboratory</option>
                <option value="LAB-201">LAB-201</option>
                <option value="LAB-202">LAB-202</option>
                <option value="LAB-203">LAB-203</option>
                <option value="LAB-204">LAB-204</option>
                <option value="LAB-205">LAB-205</option>
                <option value="LAB-IoT">LAB-IoT</option>
              </select>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700"
                  onClick={toggleModalEdit}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                  onClick={handleUpdateSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
