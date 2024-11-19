const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const {
  checkAttendance,
  createAttendanceTable,
  deleteSchedule,
  updateSchedule,
  getSchedule,
  insertSchedule,
  createScheduleTable,
  updateInstructor,
  deleteInstructor,
  insertInstructor,
  getInstructors,
  createAdmin,
  createTable,
  loginAdmin,
  createInstructorTable,
  getScheduleWithInstructorForAttendance,
  insertAttendance,
} = require("./models/statements");


const {getAttendanceLogs} = require("./models/logs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "assets/icons/UICLogo.png"),

    frame: true,
    webPreferences: {
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },

    autoHideMenuBar: true,
  });

  mainWindow.maximize();
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createTable();
  createInstructorTable();
  createScheduleTable();
  createWindow();
  getScheduleWithInstructorForAttendance();
  createAttendanceTable();

  getAttendanceLogs();



  // insertAttendance(32,200512212122, "ASlkasdfas");
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle("create-admin", async (event, adminData) => {
  try {
    const result = await createAdmin(
      adminData.name,
      adminData.email,
      adminData.password
    );
    return result;
  } catch (error) {
    console.error("Error creating admin:", error);
    return { success: false, message: error.message };
  }
});

ipcMain.handle("login-admin", async (event, adminData) => {
  // await insertInstructor(
  //   "John",
  //   "Doe",
  //   "Smith",
  //   "Male",
  //   "john.doe@example.com",
  //   "1234567890"
  // );
  // const instructors = await getInstructors();
  // console.log(instructors);

  // await insertSchedule(
  //   2352342423424,
  //   "Math 101",
  //   "08:00",
  //   "10:00",
  //   {
  //     monday: true,
  //     tuesday: false,
  //     wednesday: true,
  //     thursday: false,
  //     friday: true,
  //     saturday: false,
  //     sunday: false,
  //   },
  //   "Room 101"
  // );

  try {
    const result = await loginAdmin(adminData.email, adminData.password);

    return result;
  } catch (error) {
    console.error("Error login admin:", error);
    return { success: false, message: error.message };
  }
});

// Handle insertInstructor IPC request
ipcMain.handle(
  "insert-instructor",
  async (
    event,
    instructor_ID,
    firstName,
    middleName,
    lastName,
    gender,
    email,
    rfid
  ) => {
    try {
      await insertInstructor(
        instructor_ID,
        firstName,
        middleName,
        lastName,
        gender,
        email,
        rfid
      );
      return { success: true, message: "Instructor inserted successfully!" };
    } catch (error) {
      return {
        success: false,
        message: `Error inserting instructor: ${error.message}`,
      };
    }
  }
);

// Handle getInstructors IPC request
ipcMain.handle("get-instructors", async () => {
  try {
    const instructors = await getInstructors();
    return { success: true, instructors };
  } catch (error) {
    return {
      success: false,
      message: `Error retrieving instructors: ${error.message}`,
    };
  }
});

ipcMain.handle("get-schedule", async () => {
  try {
    const schedules = await getSchedule(); // Call the schedule function
    return { success: true, schedules }; // Send the result back to the renderer
  } catch (error) {
    return {
      success: false,
      message: `Error retrieving instructors: ${error.message}`,
    }; // Send the error message back
  }
});

ipcMain.handle(
  "update-instructor",
  async (
    event,
    exID,
    instructor_ID,
    firstName,
    middleName,
    lastName,
    gender,
    email,
    rfid
  ) => {
    try {
      await updateInstructor(
        exID,
        instructor_ID,
        firstName,
        middleName,
        lastName,
        gender,
        email,
        rfid
      );
      return { success: true, message: "Instructor updated successfully!" };
    } catch (error) {
      return {
        success: false,
        message: `Error updating instructor: ${error.message}`,
      };
    }
  }
);

ipcMain.handle("delete-instructor", async (event, instructor_ID) => {
  try {
    await deleteInstructor(instructor_ID);
    return { success: true, message: "Instructor deleted successfully!" };
  } catch (error) {
    return {
      success: false,
      message: `Error deleting instructor: ${error.message}`,
    };
  }
});

// Handle insertSchedule from renderer process
ipcMain.handle("insert-schedule", async (event, scheduleData) => {
  try {
    const { instructor_ID, subject, start_time, end_time, days, lab } =
      scheduleData;
    const result = await insertSchedule(
      instructor_ID,
      subject,
      start_time,
      end_time,
      days,
      lab
    );

    console.log(days);
    return result;
  } catch (error) {
    console.error("Error inserting schedule:", error);
    return { success: false, message: error.message };
  }
});

// ipcMain.handle("get-schedule", async (event, instructor_ID) => {
//   try {
//     const result = await getSchedule(instructor_ID);

//     return result; // Send result back to renderer process
//   } catch (error) {
//     console.error("IPC Error:", error);
//     return {
//       success: false,
//       message: "An error occurred while fetching the schedule.",
//     };
//   }
// });

// DELETE Schedule IPC Handler
ipcMain.handle("delete-schedule", async (event, schedule_id) => {
  try {
    const result = await deleteSchedule(schedule_id);
    return result;
  } catch (error) {
    console.error("IPC Error (delete):", error);
    return {
      success: false,
      message: "An error occurred while deleting the schedule.",
    };
  }
});

// UPDATE Schedule IPC Handler
ipcMain.handle("update-schedule", async (event, schedule_id, updatedData) => {
  try {
    const result = await updateSchedule(schedule_id, updatedData);
    return result;
  } catch (error) {
    console.error("IPC Error (update):", error);
    return {
      success: false,
      message: "An error occurred while updating the schedule.",
    };
  }
});

// ipcMain.handle("get-schedule-with-instructor", async () => {
//   try {
//     const schedules = await getScheduleWithInstructor(); // Call the schedule function
//     return { success: true, schedules }; // Send the result back to the renderer
//   } catch (error) {
//     return {
//       success: false,
//       message: `Error retrieving instructors: ${error.message}`,
//     }; // Send the error message back
//   }
// });

// Handle the 'get-schedule-with-instructor' event
ipcMain.handle(
  "get-schedule-with-instructor-for-attendance",
  async (event, lab) => {
    const result = getScheduleWithInstructorForAttendance(lab);
    return result; // Returns result to the renderer process
  }
);

// Listen for the insertAttendance event
ipcMain.handle(
  "insert-attendance",
  async (event, schedule_ID, instructor_ID, rfid) => {
    try {
      const result = await insertAttendance(schedule_ID, instructor_ID, rfid);
      return { success: true, result }; // Return success and the result
    } catch (error) {
      console.error("Error in IPC insert-attendance:", error);
      return { success: false, message: error.message }; // Return failure and the error message
    }
  }
);

ipcMain.handle("checkAttendance", async (event, { id, instructor_ID, lab }) => {
  try {
    // Logic for checking attendance (e.g., database query)
    const result = await someDatabaseFunction(id, instructor_ID, lab);
    return result; // Send result back to the renderer process
  } catch (error) {
    console.error("Error in checkAttendance handler:", error);
    throw error; // Propagate error to the renderer process
  }
});


ipcMain.handle("get-attendance-logs", async () => {
  try {
    const logs = getAttendanceLogs();
    return logs;
  } catch (error) {
    console.error("Error fetching attendance logs:", error);
    throw error;
  }
});