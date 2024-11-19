// import React, { useState, useEffect } from "react";

// export default function SchedData({ lab }) {
//   // State for holding the schedule and instructor data
//   const [instructorList, setInstructorList] = useState([]);
//   const [infoMessage, setInfoMessage] = useState("");
//   const [message, setMessage] = useState(""); // For displaying success/failure messages

//   // Function to get the schedule with instructor data
//   const handleGetInstructorList = async () => {
//     try {
//       const response = await window.api.getScheduleWithInstructorForAttendance(
//         lab
//       );

//       if (response && Array.isArray(response) && response.length > 0) {
//         setInstructorList(response); // Update the state with the fetched schedule list
//       } else {
//         setInfoMessage("No schedule found."); // Update the message if the list is empty
//       }
//     } catch (error) {
//       setInfoMessage("Failed to load Schedule."); // Update the message in case of an error
//       console.error("Error fetching schedule:", error);
//     }
//   };

//   // Function to handle the attendance insertion
//   const handleHandleAttendance = async (scheduleID, instructorID, rfid) => {
//     try {
//       const response = await window.api.insertAttendance(
//         scheduleID,
//         instructorID,
//         rfid
//       );
//       if (response.success) {
//         setMessage("Attendance record inserted successfully!");
//       } else {
//         setMessage(`Error: ${response.message}`);
//       }
//     } catch (error) {
//       setMessage("Failed to insert attendance record.");
//       console.error("Error submitting attendance:", error);
//     }
//   };

//   // Function to check and insert attendance once the schedule start time matches current time
//   const checkAndInsertAttendance = () => {
//     const currentTime = new Date().toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     instructorList.forEach((instructor) => {
//       const startTime = convertTo12HourFormat(instructor.start_time);
//       const instructorID = instructor.instructor_ID;
//       const scheduleID = instructor.id;
//       const rfid = instructor.rfid; // Replace with actual RFID if available or pass dynamically
//       alert(currentTime >= startTime);
//       // Check if the current time matches the schedule's start time
//       if (currentTime >= startTime) {
//         handleHandleAttendance(scheduleID, instructorID, rfid);
//       }
//     });
//   };

//   // Use Effect to fetch data when the component mounts and set up attendance check
//   useEffect(() => {
//     handleGetInstructorList();

//     // Set interval to call handleGetInstructorList every 8 seconds
//     const intervalId = setInterval(() => {
//       handleGetInstructorList();
//       checkAndInsertAttendance(); // Check and insert attendance on every interval
//     }, 1); // Adjust the interval time if necessary

//     // Cleanup function to clear the interval when the component is unmounted
//     return () => clearInterval(intervalId);
//   }, [lab]); // Re-run the effect when the `lab` prop changes

//   const convertTo12HourFormat = (time) => {
//     let [hours, minutes] = time.split(":"); // Split the time into hours and minutes
//     hours = parseInt(hours, 10); // Convert hours to integer

//     const period = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
//     hours = hours % 12 || 12; // Convert to 12-hour format, ensure 12 PM and 12 AM are handled correctly
//     minutes = minutes.padStart(2, "0"); // Ensure minutes are 2 digits (e.g., '05' instead of '5')

//     return `${hours}:${minutes} ${period}`;
//   };

//   return (
//     <div className="border-dashed border-2 border-blue-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4">
//       <h1 className="bg-blue-100 text-blue-700 font-semibold text-lg p-3 rounded-md w-fit">
//         {lab}
//       </h1>
//       {infoMessage && <p className="text-red-500 mt-2">{infoMessage}</p>}
//       {message && <p className="text-green-500 mt-2">{message}</p>}{" "}
//       {/* Display success or error messages */}
//       {instructorList.length > 0 ? (
//         instructorList.map((instructor, index) => (
//           <div key={index} className="mt-4">
//             <p className="text-gray-600 mt-2">
//               Subject: {instructor.subject || "Example Subject"}
//             </p>
//             <p className="text-gray-600">
//               Instructor:{" "}
//               {instructor.firstName + " " + instructor.lastName ||
//                 "Example Instructor"}
//             </p>
//             <p className="text-gray-600">
//               Time:{" "}
//               {convertTo12HourFormat(instructor.start_time) +
//                 "-" +
//                 convertTo12HourFormat(instructor.end_time) ||
//                 "9:00 AM - 11:00 AM"}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-600 mt-2">No schedules available.</p>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";

// export default function SchedData({ lab }) {
//   // State for holding the schedule and instructor data
//   const [instructorList, setInstructorList] = useState([]);
//   const [infoMessage, setInfoMessage] = useState("");

//   // Function to get the schedule with instructor data
//   const handleGetInstructorList = async () => {
//     try {
//       const response = await window.api.getScheduleWithInstructorForAttendance(
//         lab
//       );

//       if (response && Array.isArray(response) && response.length > 0) {
//         setInstructorList(response); // Update the state with the fetched schedule list
//       } else {
//         setInfoMessage("No schedule found."); // Update the message if the list is empty
//       }
//     } catch (error) {
//       setInfoMessage("Failed to load Schedule."); // Update the message in case of an error
//       console.error("Error fetching schedule:", error);
//     }
//   };

//   // Use Effect to fetch data when the component mounts
//   // useEffect(() => {
//   //   handleGetInstructorList();
//   // }, []);

//   const handleHandleAttendance = async (e) => {
//   //This should be run once, i will not run in loop and this should only insert one entry when the start_time start
//     try {
//       const response = await window.api.insertAttendance(scheduleID, instructorID, rfid);
//       if (response.success) {
//         setMessage("Attendance record inserted successfully!");
//       } else {
//         setMessage(`Error: ${response.message}`);
//       }
//     } catch (error) {
//       setMessage("Failed to insert attendance record.");
//       console.error("Error submitting attendance:", error);
//     }
//   };

//     //   // Set interval to call handleGetInstructorList every 5 seconds (5000ms)
//     const intervalId = setInterval(() => {
//       handleGetInstructorList();
//     }, 80000); // You can adjust the interval time (5 seconds here)

//   // useEffect(() => {
//   //   // Call handleGetInstructorList immediately on mount
//   //   handleGetInstructorList();

//   //   // Set interval to call handleGetInstructorList every 5 seconds (5000ms)
//   //   const intervalId = setInterval(() => {
//   //     handleGetInstructorList();
//   //   }, 8000); // You can adjust the interval time (5 seconds here)

//   //   // Cleanup function to clear the interval when the component is unmounted
//   //   return () => clearInterval(intervalId);
//   // }, [lab]); // Re-run the effect when the `lab` prop changes

//   const convertTo12HourFormat = (time) => {
//     let [hours, minutes] = time.split(":"); // Split the time into hours and minutes
//     hours = parseInt(hours, 10); // Convert hours to integer

//     const period = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
//     hours = hours % 12 || 12; // Convert to 12-hour format, ensure 12 PM and 12 AM are handled correctly
//     minutes = minutes.padStart(2, "0"); // Ensure minutes are 2 digits (e.g., '05' instead of '5')

//     return `${hours}:${minutes} ${period}`;
//   };

//   return (
//     <div className="border-dashed border-2 border-blue-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4">
//       <h1 className="bg-blue-100 text-blue-700 font-semibold text-lg p-3 rounded-md w-fit">
//         {lab}
//       </h1>

//       {infoMessage && <p className="text-red-500 mt-2">{infoMessage}</p>}

//       {instructorList.length > 0 ? (
//         instructorList.map((instructor, index) => (
//           <div key={index} className="mt-4">
//             <p className="text-gray-600 mt-2">
//               Subject: {instructor.subject || "Example Subject"}
//             </p>
//             <p className="text-gray-600">
//               Instructor:{" "}
//               {instructor.firstName + " " + instructor.lastName ||
//                 "Example Instructor"}
//             </p>
//             <p className="text-gray-600">
//               Time:{" "}
//               {convertTo12HourFormat(instructor.start_time) +
//                 "-" +
//                 convertTo12HourFormat(instructor.end_time) ||
//                 "9:00 AM - 11:00 AM"}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-600 mt-2">No schedules available.</p>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";

// export default function SchedData({ lab }) {
//   // State for holding the schedule and instructor data
//   const [instructorList, setInstructorList] = useState([]);
//   const [previousInstructorList, setPreviousInstructorList] = useState([]); // Track the previous schedule
//   const [infoMessage, setInfoMessage] = useState("");
//   const [message, setMessage] = useState(""); // State for displaying messages

//   // Function to get the schedule with instructor data
//   const handleGetInstructorList = async () => {
//     try {
//       const response = await window.api.getScheduleWithInstructorForAttendance(lab);

//       if (response && Array.isArray(response) && response.length > 0) {
//         // Compare current schedule with previous one
//         if (JSON.stringify(response) !== JSON.stringify(previousInstructorList)) {
//           // If schedules differ, update instructor list and insert attendance
//           setInstructorList(response);
//           await handleHandleAttendance(response); // Insert attendance for new schedule
//           setPreviousInstructorList(response); // Update previous schedule
//         }
//       } else {
//         setInfoMessage("No schedule found."); // Update the message if the list is empty
//       }
//     } catch (error) {
//       setInfoMessage("Failed to load Schedule."); // Update the message in case of an error
//       console.error("Error fetching schedule:", error);
//     }
//   };

//   // Function to handle attendance insertion
//   const handleHandleAttendance = async (scheduleData) => {
//     try {
//       const { id, instructor_ID, rfid } = scheduleData[0]; // Use the first instructor's schedule for attendance (you can adjust this)
//       const response = await window.api.insertAttendance(id, instructor_ID, rfid);
//       if (response.success) {
//         setMessage("Attendance record inserted successfully!");
//       } else {
//         setMessage(`Error: ${response.message}`);
//       }
//     } catch (error) {
//       setMessage("Failed to insert attendance record.");
//       console.error("Error submitting attendance:", error);
//     }
//   };

//   // const intervalId = setInterval(() => {
//   //   handleGetInstructorList();
//   // }, 8000); // You can adjust the interval time (8 seconds here)

//   // // Use Effect to fetch data when the component mounts and set interval to refresh
//   useEffect(() => {
//     handleGetInstructorList();

//     const intervalId = setInterval(() => {
//       handleGetInstructorList();
//     }, 8000); // You can adjust the interval time (8 seconds here)

//     return () => clearInterval(intervalId); // Cleanup function to clear the interval
//   }, [lab, previousInstructorList]); // Re-run effect when `lab` or `previousInstructorList` changes

//   const convertTo12HourFormat = (time) => {
//     let [hours, minutes] = time.split(":"); // Split the time into hours and minutes
//     hours = parseInt(hours, 10); // Convert hours to integer

//     const period = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
//     hours = hours % 12 || 12; // Convert to 12-hour format, ensure 12 PM and 12 AM are handled correctly
//     minutes = minutes.padStart(2, "0"); // Ensure minutes are 2 digits (e.g., '05' instead of '5')

//     return `${hours}:${minutes} ${period}`;
//   };

//   return (
//     <div className="border-dashed border-2 border-blue-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4">
//       <h1 className="bg-blue-100 text-blue-700 font-semibold text-lg p-3 rounded-md w-fit">
//         {lab}
//       </h1>

//       {infoMessage && <p className="text-red-500 mt-2">{infoMessage}</p>}

//       {message && <p className="text-green-500 mt-2">{message}</p>}

//       {instructorList.length > 0 ? (
//         instructorList.map((instructor, index) => (
//           <div key={index} className="mt-4">
//             <p className="text-gray-600 mt-2">
//               Subject: {instructor.subject || "Example Subject"}
//             </p>
//             <p className="text-gray-600">
//               Instructor:{" "}
//               {instructor.firstName + " " + instructor.lastName ||
//                 "Example Instructor"}
//             </p>
//             <p className="text-gray-600">
//               Time:{" "}
//               {convertTo12HourFormat(instructor.start_time) +
//                 "-" +
//                 convertTo12HourFormat(instructor.end_time) ||
//                 "9:00 AM - 11:00 AM"}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-600 mt-2">No schedules available.</p>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";

// export default function SchedData({ lab }) {
//   const [instructorList, setInstructorList] = useState([]);
//   const [previousInstructorList, setPreviousInstructorList] = useState([]);
//   const [infoMessage, setInfoMessage] = useState("");
//   const [message, setMessage] = useState("");

//   // Function to check attendance records
//   const checkAttendance = async (schedule_ID, instructor_ID) => {
//     try {
//       const attendanceExists = await window.api.checkAttendance({
//         lab,
//         schedule_ID,
//         instructor_ID,
//       });
//       return attendanceExists; // Returns true if attendance exists, false otherwise
//     } catch (error) {
//       console.error("Error checking attendance:", error);
//       return false; // Assume no attendance exists if there's an error
//     }
//   };

//   // Function to get the schedule with instructor data
//   const handleGetInstructorList = async () => {
//     try {
//       const response = await window.api.getScheduleWithInstructorForAttendance(lab);

//       if (response && Array.isArray(response) && response.length > 0) {
//         const instructor = response[0]; // Assume you handle the first instructor in the list
//         const attendanceExists = await checkAttendance(instructor.id, instructor.instructor_ID);

//         if (!attendanceExists) {
//           setInstructorList(response);
//           await handleHandleAttendance(instructor); // Insert attendance if no record exists
//           setPreviousInstructorList(response); // Update previous schedule
//         } else {
//           setInfoMessage("Attendance already recorded for this schedule.");
//         }
//       } else {
//         setInfoMessage("No schedule found.");
//       }
//     } catch (error) {
//       setInfoMessage("Failed to load schedule.");
//       console.error("Error fetching schedule:", error);
//     }
//   };

//   // Function to handle attendance insertion
//   const handleHandleAttendance = async (scheduleData) => {
//     try {
//       const { id, instructor_ID, rfid } = scheduleData; // Ensure required fields are passed
//       const response = await window.api.insertAttendance(id, instructor_ID, rfid);
//       if (response.success) {
//         setMessage("Attendance record inserted successfully!");
//       } else {
//         setMessage(`Error: ${response.message}`);
//       }
//     } catch (error) {
//       setMessage("Failed to insert attendance record.");
//       console.error("Error submitting attendance:", error);
//     }
//   };

//   // Use Effect to fetch data and check attendance
//   useEffect(() => {
//     handleGetInstructorList();

//     const intervalId = setInterval(() => {
//       handleGetInstructorList();
//     }, 8000); // Adjust interval as needed

//     return () => clearInterval(intervalId);
//   }, [lab, previousInstructorList]);

//   const convertTo12HourFormat = (time) => {
//     let [hours, minutes] = time.split(":");
//     hours = parseInt(hours, 10);
//     const period = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12 || 12;
//     minutes = minutes.padStart(2, "0");
//     return `${hours}:${minutes} ${period}`;
//   };

//   return (
//     <div className="border-dashed border-2 border-blue-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4">
//       <h1 className="bg-blue-100 text-blue-700 font-semibold text-lg p-3 rounded-md w-fit">
//         {lab}
//       </h1>

//       {infoMessage && <p className="text-red-500 mt-2">{infoMessage}</p>}
//       {message && <p className="text-green-500 mt-2">{message}</p>}

//       {instructorList.length > 0 ? (
//         instructorList.map((instructor, index) => (
//           <div key={index} className="mt-4">
//             <p className="text-gray-600 mt-2">
//               Subject: {instructor.subject || "Example Subject"}
//             </p>
//             <p className="text-gray-600">
//               Instructor:{" "}
//               {instructor.firstName + " " + instructor.lastName ||
//                 "Example Instructor"}
//             </p>
//             <p className="text-gray-600">
//               Time:{" "}
//               {convertTo12HourFormat(instructor.start_time) +
//                 "-" +
//                 convertTo12HourFormat(instructor.end_time) ||
//                 "9:00 AM - 11:00 AM"}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-600 mt-2">No schedules available.</p>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";

// export default function SchedData({ lab }) {
//   const [instructorList, setInstructorList] = useState([]);
//   const [previousInstructorList, setPreviousInstructorList] = useState([]);
//   const [infoMessage, setInfoMessage] = useState("");
//   const [message, setMessage] = useState("");

//   // Fetch schedule data
//   const fetchInstructorList = async () => {
//     try {
//       const response = await window.api.getScheduleWithInstructorForAttendance(lab);
//       if (response && Array.isArray(response) && response.length > 0) {
//         if (JSON.stringify(response) !== JSON.stringify(previousInstructorList)) {
//           setInstructorList(response);
//           setPreviousInstructorList(response); // Update previous data
//         }
//       } else {
//         setInfoMessage("No schedule found.");
//       }
//     } catch (error) {
//       setInfoMessage("Failed to load schedule.");
//       console.error("Error fetching schedule:", error);
//     }
//   };

//   // Handle attendance when start time matches the current time
//   const handleAttendance = async () => {
//     const currentTime = new Date().toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     instructorList.forEach(async (instructor) => {
//       const startTime = convertTo12HourFormat(instructor.start_time);
//       if (currentTime === startTime) {
//         try {
//           const response = await window.api.insertAttendance(
//             instructor.id,
//             instructor.instructor_ID,
//             instructor.rfid
//           );
//           setMessage(
//             response.success
//               ? "Attendance record inserted successfully!"
//               : `Error: ${response.message}`
//           );
//         } catch (error) {
//           setMessage("Failed to insert attendance record.");
//           console.error("Error submitting attendance:", error);
//         }
//       }
//     });
//   };

//   // Convert time to 12-hour format
//   const convertTo12HourFormat = (time) => {
//     let [hours, minutes] = time.split(":");
//     hours = parseInt(hours, 10);
//     const period = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12 || 12;
//     minutes = minutes.padStart(2, "0");
//     return `${hours}:${minutes} ${period}`;
//   };

//   // UseEffect to manage intervals and component lifecycle
//   useEffect(() => {
//     fetchInstructorList();

//     const intervalId = setInterval(() => {
//       fetchInstructorList();
//       handleAttendance();
//     }, 100);

//     return () => clearInterval(intervalId);
//   }, [lab, instructorList]); // Depend on lab and instructorList

//   return (
//     <div className="border-dashed border-2 border-blue-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4">
//       <h1 className="bg-blue-100 text-blue-700 font-semibold text-lg p-3 rounded-md w-fit">
//         {lab}
//       </h1>

//       {infoMessage && <p className="text-red-500 mt-2">{infoMessage}</p>}
//       {message && <p className="text-green-500 mt-2">{message}</p>}

//       {instructorList.length > 0 ? (
//         instructorList.map((instructor, index) => (
//           <div key={index} className="mt-4">
//             <p className="text-gray-600 mt-2">
//               Subject: {instructor.subject || "Example Subject"}
//             </p>
//             <p className="text-gray-600">
//               Instructor: {`${instructor.firstName} ${instructor.lastName}` || "Example Instructor"}
//             </p>
//             <p className="text-gray-600">
//               Time:{" "}
//               {convertTo12HourFormat(instructor.start_time) +
//                 " - " +
//                 convertTo12HourFormat(instructor.end_time) || "9:00 AM - 11:00 AM"}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-600 mt-2">No schedules available.</p>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";

// export default function SchedData({ lab }) {
//   const [instructorList, setInstructorList] = useState([]);
//   const [previousInstructorList, setPreviousInstructorList] = useState([]);
//   const [infoMessage, setInfoMessage] = useState("");
//   const [message, setMessage] = useState("");

//   // Fetch schedule data
//   const fetchInstructorList = async () => {
//     try {
//       const response = await window.api.getScheduleWithInstructorForAttendance(lab);
//       if (response && Array.isArray(response) && response.length > 0) {
//         if (JSON.stringify(response) !== JSON.stringify(previousInstructorList)) {
//           setInstructorList(response);
//           setPreviousInstructorList(response); // Update previous data
//         }
//       } else {
//         setInfoMessage("No schedule found.");
//       }
//     } catch (error) {
//       setInfoMessage("Failed to load schedule.");
//       console.error("Error fetching schedule:", error);
//     }
//   };

//   // Handle attendance when clicking on a schedule
//   const handleAttendanceClick = async (instructor) => {
//     try {
//       const response = await window.api.insertAttendance(
//         instructor.id,
//         instructor.instructor_ID,
//         instructor.rfid
//       );
//       setMessage(
//         response.success
//           ? "Attendance record inserted successfully!"
//           : `Error: ${response.message}`
//       );
//     } catch (error) {
//       setMessage("Failed to insert attendance record.");
//       console.error("Error submitting attendance:", error);
//     }
//   };

//   // Convert time to 12-hour format
//   const convertTo12HourFormat = (time) => {
//     let [hours, minutes] = time.split(":");
//     hours = parseInt(hours, 10);
//     const period = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12 || 12;
//     minutes = minutes.padStart(2, "0");
//     return `${hours}:${minutes} ${period}`;
//   };

//   // UseEffect to manage intervals and component lifecycle
//   useEffect(() => {
//     fetchInstructorList();

//     const intervalId = setInterval(() => {
//       fetchInstructorList();
//     }, 10000); // Fetch every 10 seconds (you can adjust the interval)

//     return () => clearInterval(intervalId);
//   }, [lab, instructorList]); // Depend on lab and instructorList

//   return (
//     <div className="border-dashed border-2 border-blue-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4">
//       <h1 className="bg-blue-100 text-blue-700 font-semibold text-lg p-3 rounded-md w-fit">
//         {lab}
//       </h1>

//       {infoMessage && <p className="text-red-500 mt-2">{infoMessage}</p>}
//       {message && <p className="text-green-500 mt-2">{message}</p>}

//       {instructorList.length > 0 ? (
//         instructorList.map((instructor, index) => (
//           <div
//             key={index}
//             className="mt-4 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
//             onClick={() => handleAttendanceClick(instructor)} // Make the schedule clickable
//           >
//             <p className="text-gray-600 mt-2">
//               Subject: {instructor.subject || "Example Subject"}
//             </p>
//             <p className="text-gray-600">
//               Instructor: {`${instructor.firstName} ${instructor.lastName}` || "Example Instructor"}
//             </p>
//             <p className="text-gray-600">
//               Time:{" "}
//               {convertTo12HourFormat(instructor.start_time) +
//                 " - " +
//                 convertTo12HourFormat(instructor.end_time) || "9:00 AM - 11:00 AM"}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-600 mt-2">No schedules available.</p>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";

// export default function SchedData({ lab }) {
//   const [instructorList, setInstructorList] = useState([]);
//   const [previousInstructorList, setPreviousInstructorList] = useState([]);
//   const [infoMessage, setInfoMessage] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false); // Track loading state

//   // Fetch schedule data
//   const fetchInstructorList = async () => {
//     setLoading(true); // Show loading indicator
//     try {
//       const response = await window.api.getScheduleWithInstructorForAttendance(
//         lab
//       );
//       if (response && Array.isArray(response) && response.length > 0) {
//         if (
//           JSON.stringify(response) !== JSON.stringify(previousInstructorList)
//         ) {
//           setInstructorList(response);
//           setPreviousInstructorList(response); // Update previous data
//         }
//       } else {
//         setInfoMessage("No schedule found.");
//       }
//     } catch (error) {
//       setInfoMessage("Failed to load schedule.");
//       console.error("Error fetching schedule:", error);
//     } finally {
//       setLoading(false); // Hide loading indicator
//     }
//   };

//   // Handle attendance when clicking on a schedule
//   const handleAttendanceClick = async (instructor) => {
//     try {
//       const response = await window.api.insertAttendance(
//         instructor.id,
//         instructor.instructor_ID,
//         instructor.rfid
//       );
//       setMessage(
//         response.success
//           ? "Attendance record inserted successfully!"
//           : `Error: ${response.message}`
//       );
//     } catch (error) {
//       setMessage("Failed to insert attendance record.");
//       console.error("Error submitting attendance:", error);
//     }
//   };

//   // Convert time to 12-hour format
//   const convertTo12HourFormat = (time) => {
//     let [hours, minutes] = time.split(":");
//     hours = parseInt(hours, 10);
//     const period = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12 || 12;
//     minutes = minutes.padStart(2, "0");
//     return `${hours}:${minutes} ${period}`;
//   };

//   // UseEffect to manage intervals and component lifecycle
//   useEffect(() => {
//     fetchInstructorList();

//     const intervalId = setInterval(() => {
//       fetchInstructorList();
//     }, 10000); // Fetch every 10 seconds (you can adjust the interval)

//     return () => clearInterval(intervalId);
//   }, [lab, instructorList]); // Depend on lab and instructorList

//   return (
//     <div className="border-2 border-blue-300 rounded-lg shadow-lg p-6 bg-white transition-all duration-300">
//       <h1 className="bg-blue-100 text-blue-700 font-semibold text-xl p-3 rounded-md text-center w-full mb-4">
//         {lab}
//       </h1>

//       {infoMessage && (
//         <p className="text-red-500 mt-2 text-center">{infoMessage}</p>
//       )}
//       {message && <p className="text-green-500 mt-2 text-center">{message}</p>}

//       {loading && (
//         <div className="flex justify-center items-center mt-4">
//           <div className="w-12 h-12 border-4 border-t-blue-500 border-transparent rounded-full animate-spin"></div>
//         </div>
//       )}

//       {instructorList.length > 0 ? (
//         instructorList.map((instructor, index) => (
//           <div
//             key={index}
//             className="mt-4 cursor-pointer hover:bg-gray-200 p-4 rounded-lg shadow-md transition-all duration-300"
//             onClick={() => handleAttendanceClick(instructor)} // Make the schedule clickable
//           >
//             <p className="text-gray-800 text-lg font-medium">
//               {instructor.subject || "Example Subject"}
//             </p>
//             <p className="text-gray-700 text-md">
//               {`${instructor.firstName} ${instructor.lastName}` ||
//                 "Example Instructor"}
//             </p>
//             <p className="text-gray-600">
//               {convertTo12HourFormat(instructor.start_time) +
//                 " - " +
//                 convertTo12HourFormat(instructor.end_time) ||
//                 "9:00 AM - 11:00 AM"}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-600 mt-2 text-center">
//           No schedules available.
//         </p>
//       )}
//     </div>
//   );
// }





// import React, { useState, useEffect } from "react";

// export default function SchedData({ lab }) {
//   const [instructorList, setInstructorList] = useState([]);
//   const [previousInstructorList, setPreviousInstructorList] = useState([]);
//   const [infoMessage, setInfoMessage] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false); // Track loading state

//   // Fetch schedule data
//   const fetchInstructorList = async () => {
//     setLoading(true); // Show loading indicator
//     try {
//       const response = await window.api.getScheduleWithInstructorForAttendance(
//         lab
//       );
//       if (response && Array.isArray(response) && response.length > 0) {
//         if (
//           JSON.stringify(response) !== JSON.stringify(previousInstructorList)
//         ) {
//           setInstructorList(response);
//           setPreviousInstructorList(response); // Update previous data
//         }
//       } else {
//         setInfoMessage("No schedule found.");
//       }
//     } catch (error) {
//       setInfoMessage("Failed to load schedule.");
//       console.error("Error fetching schedule:", error);
//     } finally {
//       setLoading(false); // Hide loading indicator
//     }
//   };

//   // Handle attendance when clicking on a schedule
//   const handleAttendanceClick = async (instructor) => {
//     try {
//       const response = await window.api.insertAttendance(
//         instructor.id,
//         instructor.instructor_ID,
//         instructor.rfid
//       );
//       setMessage(
//         response.success
//           ? "Attendance record inserted successfully!"
//           : `Error: ${response.message}`
//       );
//     } catch (error) {
//       setMessage("Failed to insert attendance record.");
//       console.error("Error submitting attendance:", error);
//     }
//   };

//   // Convert time to 12-hour format
//   const convertTo12HourFormat = (time) => {
//     let [hours, minutes] = time.split(":");
//     hours = parseInt(hours, 10);
//     const period = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12 || 12;
//     minutes = minutes.padStart(2, "0");
//     return `${hours}:${minutes} ${period}`;
//   };

//   // UseEffect to manage intervals and component lifecycle
//   useEffect(() => {
//     fetchInstructorList();

//     const intervalId = setInterval(() => {
//       fetchInstructorList();
//     }, 10000); // Fetch every 10 seconds (you can adjust the interval)

//     return () => clearInterval(intervalId);
//   }, [lab, instructorList]); // Depend on lab and instructorList

//   return (
//     <div className="border-2 border-blue-300 rounded-lg shadow-lg p-6 bg-white transition-all duration-300">
//       <h1 className="bg-blue-100 text-blue-700 font-semibold text-xl p-3 rounded-md text-center w-full mb-4">
//         {lab}
//       </h1>

//       {infoMessage && (
//         <p className="text-red-500 mt-2 text-center">{infoMessage}</p>
//       )}
//       {message && <p className="text-green-500 mt-2 text-center">{message}</p>}

//       {loading && (
//         <div className="flex justify-center items-center mt-4">
//           <div className="w-12 h-12 border-4 border-t-blue-500 border-transparent rounded-full animate-spin"></div>
//         </div>
//       )}

//       {instructorList.length > 0 ? (
//         instructorList.map((instructor, index) => {
//           const isAttended = instructor.attended; // Assuming 'attended' field exists

//           return (
//             <div
//               key={index}
//               className={`mt-4 cursor-pointer hover:bg-gray-200 p-4 rounded-lg shadow-md transition-all duration-300 ${
//                 isAttended ? "bg-green-100 border-green-400" : "bg-white"
//               }`}
//               onClick={() => handleAttendanceClick(instructor)} // Make the schedule clickable
//             >
//               <p className="text-gray-800 text-lg font-medium">
//                 {instructor.subject || "Example Subject"}
//               </p>
//               <p className="text-gray-700 text-md">
//                 {`${instructor.firstName} ${instructor.lastName}` ||
//                   "Example Instructor"}
//               </p>
//               <p className="text-gray-600">
//                 {convertTo12HourFormat(instructor.start_time) +
//                   " - " +
//                   convertTo12HourFormat(instructor.end_time) ||
//                   "9:00 AM - 11:00 AM"}
//               </p>
//               {isAttended && (
//                 <p className="text-green-600 mt-2 text-sm font-semibold">
//                   Attendance marked
//                 </p>
//               )}
//             </div>
//           );
//         })
//       ) : (
//         <p className="text-gray-600 mt-2 text-center">No schedules available.</p>
//       )}
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";

export default function SchedData({ lab }) {
  const [instructorList, setInstructorList] = useState([]);
  const [previousInstructorList, setPreviousInstructorList] = useState([]);
  const [infoMessage, setInfoMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  // Fetch schedule data
  const fetchInstructorList = async () => {
    setLoading(true); // Show loading indicator
    try {
      const response = await window.api.getScheduleWithInstructorForAttendance(
        lab
      );
      if (response && Array.isArray(response) && response.length > 0) {
        if (
          JSON.stringify(response) !== JSON.stringify(previousInstructorList)
        ) {
          setInstructorList(response);
          setPreviousInstructorList(response); // Update previous data
        }
      } else {
        setInfoMessage("No schedule found.");
      }
    } catch (error) {
      setInfoMessage("Failed to load schedule.");
      console.error("Error fetching schedule:", error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Handle attendance when clicking on a schedule
  const handleAttendanceClick = async (instructor) => {
    try {
      const response = await window.api.insertAttendance(
        instructor.id,
        instructor.instructor_ID,
        instructor.rfid
      );
      setMessage(
        response.success
          ? "Attendance record inserted successfully!"
          : `Error: ${response.message}`
      );
    } catch (error) {
      setMessage("Failed to insert attendance record.");
      console.error("Error submitting attendance:", error);
    }
  };

  // Convert time to 12-hour format
  const convertTo12HourFormat = (time) => {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes.padStart(2, "0");
    return `${hours}:${minutes} ${period}`;
  };

  // UseEffect to fetch data on component mount
  useEffect(() => {
    fetchInstructorList();
  }, [lab]); // Re-fetch when 'lab' changes

  return (
    <div className="border-2 border-blue-300 rounded-lg shadow-lg p-6 bg-white transition-all duration-300">
      <h1 className="bg-blue-100 text-blue-700 font-semibold text-xl p-3 rounded-md text-center w-full mb-4">
        {lab}
      </h1>

      {infoMessage && (
        <p className="text-red-500 mt-2 text-center">{infoMessage}</p>
      )}
      {message && <p className="text-green-500 mt-2 text-center">{message}</p>}

      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {instructorList.length > 0 ? (
        instructorList.map((instructor, index) => {
          const isAttended = instructor.attended; // Assuming 'attended' field exists

          return (
            <div
              key={index}
              className={`mt-4 cursor-pointer hover:bg-gray-200 p-4 rounded-lg shadow-md transition-all duration-300 ${
                isAttended ? "bg-green-100 border-green-400" : "bg-white"
              }`}
              onClick={() => handleAttendanceClick(instructor)} // Make the schedule clickable
            >
              <p className="text-gray-800 text-lg font-medium">
                {instructor.subject || "Example Subject"}
              </p>
              <p className="text-gray-700 text-md">
                {`${instructor.firstName} ${instructor.lastName}` ||
                  "Example Instructor"}
              </p>
              <p className="text-gray-600">
                {convertTo12HourFormat(instructor.start_time) +
                  " - " +
                  convertTo12HourFormat(instructor.end_time) ||
                  "9:00 AM - 11:00 AM"}
              </p>
              {isAttended && (
                <p className="text-green-600 mt-2 text-sm font-semibold">
                  Attendance marked
                </p>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-gray-600 mt-2 text-center">No schedules available.</p>
      )}
    </div>
  );
}
