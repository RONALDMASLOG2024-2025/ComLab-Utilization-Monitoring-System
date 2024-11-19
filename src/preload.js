// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  createAdmin: (adminData) => ipcRenderer.invoke("create-admin", adminData),
  loginAdmin: (adminData) => ipcRenderer.invoke("login-admin", adminData),
  insertInstructor: (
    instructor_ID,
    firstName,
    middleName,
    lastName,
    gender,
    email,
    rfid
  ) => {
    return ipcRenderer.invoke(
      "insert-instructor",
      instructor_ID,
      firstName,
      middleName,
      lastName,
      gender,
      email,
      rfid
    );
  },
  getInstructors: () => {
    return ipcRenderer.invoke("get-instructors");
  },
  // Update Instructor
  updateInstructor: (
    exID,
    instructor_ID,
    firstName,
    middleName,
    lastName,
    gender,
    email,
    rfid
  ) => {
    return ipcRenderer.invoke(
      "update-instructor",
      exID,
      instructor_ID,
      firstName,
      middleName,
      lastName,
      gender,
      email,
      rfid
    );
  },
  // Delete Instructor
  deleteInstructor: (instructor_ID) => {
    return ipcRenderer.invoke("delete-instructor", instructor_ID);
  },

  getSchedule: () => {
    return ipcRenderer.invoke("get-schedule");
  },
  deleteSchedule: (schedule_id) =>
    ipcRenderer.invoke("delete-schedule", schedule_id),
  insertSchedule: (scheduleData) =>
    ipcRenderer.invoke("insert-schedule", scheduleData),
  // getSchedule: (instructor_ID) =>
  //   ipcRenderer.invoke("get-schedule", instructor_ID),
  // Delete schedule by schedule_id
  updateSchedule: (schedule_id, updatedData) =>
    ipcRenderer.invoke("update-schedule", schedule_id, updatedData), // Update schedule by schedule_id
  getScheduleWithInstructorForAttendance: async (lab) => {
    try {
      const result = await ipcRenderer.invoke(
        "get-schedule-with-instructor-for-attendance",
        lab
      );
      return result;
    } catch (error) {
      console.error(
        "Error in getScheduleWithInstructorForAttendance in preload:",
        error
      );
      return null;
    }
  },
  insertAttendance: (schedule_ID, instructor_ID, rfid) => {
    return ipcRenderer.invoke(
      "insert-attendance",
      schedule_ID,
      instructor_ID,
      rfid
    );
  },

  checkAttendance: async (id, instructor_ID, lab) => {
    try {
      return await ipcRenderer.invoke("checkAttendance", {
        id,
        instructor_ID,
        lab,
      });
    } catch (error) {
      console.error("Error checking attendance:", error);
      throw error; // Optionally, rethrow the error to be handled upstream
    }
  },

  getAttendanceLogs: async () => {
    return await ipcRenderer.invoke("get-attendance-logs");
  },
});
