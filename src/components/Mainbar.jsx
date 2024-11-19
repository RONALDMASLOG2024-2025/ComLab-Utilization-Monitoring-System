// import React, { useEffect, useState } from "react";
// import Header from "./Header.jsx";
// import Schedule from "./Schedule.jsx";
// import Setting from "./Setting.jsx";
// import Employee from "./Employee.jsx";
// import AddSchedule from "./AddSchedule.jsx";

// export default function Mainbar({ view }) {
//   const [showContent, setShowContent] = useState(false);

//   // Trigger fade-in on view change
//   useEffect(() => {
//     setShowContent(false); // Start fade-out
//     const timer = setTimeout(() => {
//       setShowContent(true); // Trigger fade-in after delay
//     }, 500); // Delay before showing the content

//     return () => clearTimeout(timer);
//   }, [view]);

//   return (
//     <div className="m-2 w-full h-full">
//       <Header />
//       <div
//         className={`transition-opacity duration-500 transform ${
//           showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
//         }`}
//       >
//         {view === 1 && <Schedule />}
//         {view === 2 && <AddSchedule />}
//         {view === 3 && <Employee />}
//         {view === 4 && <Setting />}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Schedule from "./Schedule.jsx";
import Setting from "./Setting.jsx";
import Employee from "./Employee.jsx";
import AddSchedule from "./AddSchedule.jsx";
import Logs from "./Logs.jsx";

export default function Mainbar({ view }) {
  const [refreshKey, setRefreshKey] = useState(0); // State to force re-render the Schedule component

  useEffect(() => {
    let intervalId;

    if (view === 1) {
      // Set an interval to refresh the schedule every 10 seconds
      intervalId = setInterval(() => {
        setRefreshKey((prevKey) => prevKey + 1); // Update the key to trigger a re-render
      }, 10000); // Refresh every 10 seconds

    } else {
      // Clear the interval when view is not 1
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [view]);

  return (
    <div className="m-2 w-full h-full">
      <Header />
      <div>
        {view === 1 && <Schedule key={refreshKey} />} {/* Use refreshKey to trigger re-render */}
        {view === 2 && <AddSchedule />}
        {view === 3 && <Employee />}
        {view === 4 && <Setting />}
        {view === 5 && <Logs />}
        
      </div>
    </div>
  );
}
