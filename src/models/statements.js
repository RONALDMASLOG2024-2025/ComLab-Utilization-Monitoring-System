import db from "./connectionDB.mjs";

// Create Admin Table
export async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS admin (
      admin_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      name TEXT(255) NOT NULL,
      email TEXT(255) UNIQUE NOT NULL,
      password TEXT(255) NOT NULL
    );
  `;

  try {
    await db.exec(query);
    console.log("Admin table created successfully or already exists.");
  } catch (error) {
    if (
      error.code === "SQLITE_ERROR" &&
      error.message.includes("table admin already exists")
    ) {
      console.log("The admin table already exists. No changes made.");
    } else {
      console.error("Error creating admin table:", error);
    }
  }
}

// Create Instructor Table
export async function createInstructorTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS instructor (
      instructor_ID INTEGER NOT NULL PRIMARY KEY,
      firstName TEXT(255) NOT NULL,
      middleName TEXT(255),
      lastName TEXT(255) NOT NULL,
      gender TEXT(10) NOT NULL CHECK (gender IN ('Male', 'Female')),
      email TEXT(255) UNIQUE NOT NULL,
      rfid TEXT(20) UNIQUE NOT NULL
    );
  `;

  try {
    await db.exec(query);
    console.log("Instructor table created successfully or already exists.");
  } catch (error) {
    if (
      error.code === "SQLITE_ERROR" &&
      error.message.includes("table instructor already exists")
    ) {
      console.log("The instructor table already exists. No changes made.");
    } else {
      console.error("Error creating instructor table:", error);
    }
  }
}

// Create Schedule Table
export async function createScheduleTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      instructor_ID INTEGER NOT NULL,
      subject VARCHAR(255) NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      monday BOOLEAN DEFAULT FALSE,
      tuesday BOOLEAN DEFAULT FALSE,
      wednesday BOOLEAN DEFAULT FALSE,
      thursday BOOLEAN DEFAULT FALSE,
      friday BOOLEAN DEFAULT FALSE,
      saturday BOOLEAN DEFAULT FALSE,
      sunday BOOLEAN DEFAULT FALSE,
      lab VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (instructor_ID) REFERENCES instructor(instructor_ID)
    );
  `;

  try {
    await db.exec(query);
    console.log("Schedule table created successfully or already exists.");
  } catch (error) {
    if (
      error.code === "SQLITE_ERROR" &&
      error.message.includes("table schedule already exists")
    ) {
      console.log("The schedule table already exists. No changes made.");
    } else {
      console.error("Error creating schedule table:", error);
    }
  }
}

// Insert Admin into Admin Table
export async function createAdmin(name, email, password) {
  const query = db.prepare(
    `INSERT INTO admin (name, email, password) VALUES (?, ?, ?);`
  );

  try {
    await query.run(name, email, password);
    console.log(`${name} is inserted successfully!`);
    return { success: true, message: `${name} was created successfully.` };
  } catch (error) {
    console.log("Database insert error:", error);
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      throw new Error("Email already exists.");
    }
    console.log(error);
  }
}

// Admin Login
export async function loginAdmin(email, password) {
  const query = db.prepare(
    `SELECT * FROM admin WHERE email = ? AND password = ?;`
  );

  try {
    const admin = query.get(email, password); // No await needed as .get() doesn't return a promise

    if (admin) {
      console.log("Login successful!");
      return { success: true, message: "Login successful!", admin };
    } else {
      console.log("Invalid email or password.");
      return { success: false, message: "Invalid email or password." };
    }
  } catch (error) {
    console.log("Error during login:", error);
    console.log(error);
  }
}

// Insert Instructor into Instructor Table
export async function insertInstructor(
  instructor_ID,
  firstName,
  middleName,
  lastName,
  gender,
  email,
  rfid
) {
  const query = db.prepare(`
    INSERT INTO instructor (instructor_ID, firstName, middleName, lastName, gender, email, rfid)
    VALUES (?,?, ?, ?, ?, ?, ?);
  `);

  try {
    query.run(
      instructor_ID,
      firstName,
      middleName,
      lastName,
      gender,
      email,
      rfid
    );
    console.log("Instructor inserted successfully.");
  } catch (error) {
    console.error("Error inserting instructor:", error);
  }
}

// Get All Instructors
export async function getInstructors() {
  const query = db.prepare(`SELECT * FROM instructor;`);

  try {
    const instructors = query.all(); // .all() doesn't need await as it's synchronous
    return instructors;
  } catch (error) {
    console.error("Error retrieving instructors:", error);
    return [];
  }
}

// Update Instructor in Instructor Table
export async function updateInstructor(
  id,
  instructor_ID,
  firstName,
  middleName,
  lastName,
  gender,
  email,
  rfid
) {
  const query = db.prepare(`
    UPDATE instructor
    SET instructor_ID=?, firstName = ?, middleName = ?, lastName = ?, gender = ?, email = ?, rfid = ?
    WHERE instructor_ID = ?;
  `);

  console.log(
    id +
      " " +
      instructor_ID +
      " " +
      firstName +
      " " +
      middleName +
      " " +
      lastName +
      " " +
      gender +
      " " +
      email +
      " " +
      rfid
  );

  try {
    query.run(
      id,
      firstName,
      middleName,
      lastName,
      gender,
      email,
      rfid,
      instructor_ID
    );
    console.log("Instructor updated successfully.");
  } catch (error) {
    console.error("Error updating instructor:", error);
  }
}

// Delete Instructor from Instructor Table
export async function deleteInstructor(instructor_ID) {
  const query = db.prepare(`
    DELETE FROM instructor
    WHERE instructor_ID = ?;
  `);

  try {
    query.run(instructor_ID);
    console.log("Instructor deleted successfully.");
  } catch (error) {
    console.error("Error deleting instructor:", error);
  }
}

// SELECT x.* FROM schedule x
//Get schedule
export function getSchedule() {
  const query = db.prepare(
    `SELECT * FROM schedule INNER JOIN instructor ON schedule.instructor_ID = instructor.instructor_ID;`
  );
  try {
    const result = query.all();
    if (result.length) {
      // console.log(result);
      console.log("goods bro");
      return result;
    } else {
      console.log("WALA BRO");
    }
  } catch (error) {
    console.log(error);
  }
}

export function getScheduleWithInstructor() {
  const query = db.prepare(`SELECT * FROM instructor;`);
  try {
    const result = query.all();
    if (result.length) {
      // console.log(result);
      console.log("goods NA bro");
      return result;
    } else {
      console.log("WALA BRO JUD");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function insertSchedule(
  instructor_ID,
  subject,
  start_time,
  end_time,
  days,
  lab
) {
  const query = db.prepare(`
    INSERT INTO schedule (
      instructor_ID, 
      subject, 
      start_time, 
      end_time, 
      monday, tuesday, wednesday, thursday, friday, saturday, sunday, lab
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    );
  `);

  try {
    const result = await query.run(
      instructor_ID,
      subject,
      start_time,
      end_time,
      days.monday ? 1 : 0, // Convert boolean to 1 (true) or 0 (false)
      days.tuesday ? 1 : 0,
      days.wednesday ? 1 : 0,
      days.thursday ? 1 : 0,
      days.friday ? 1 : 0,
      days.saturday ? 1 : 0,
      days.sunday ? 1 : 0,
      lab
    );
    console.log("Schedule inserted successfully!");
    return { success: true, result };
  } catch (error) {
    console.log("Database insert error:", error);
    return { success: false, message: "Failed to insert schedule.", error };
  }
}

// Delete Schedule from Schedule Table
export async function deleteSchedule(schedule_id) {
  const query = db.prepare(`
    DELETE FROM schedule WHERE id = ?;
  `);

  try {
    await query.run(schedule_id);
    console.log("Schedule deleted successfully!");
    return { success: true, message: "Schedule was deleted successfully." };
  } catch (error) {
    console.log("Database delete error:", error);
    return { success: false, message: "Failed to delete schedule." };
  }
}

// Update Schedule in Schedule Table
export async function updateSchedule(schedule_id, updatedData) {
  const query = db.prepare(`
    UPDATE schedule SET
      instructor_ID = ?,
      subject = ?,
      start_time = ?,
      end_time = ?,
      monday = ?,
      tuesday = ?,
      wednesday = ?,
      thursday = ?,
      friday = ?,
      saturday = ?,
      sunday = ?,
      lab = ?
    WHERE id = ?;
  `);

  try {
    await query.run(
      updatedData.instructor_ID,
      updatedData.subject,
      updatedData.start_time,
      updatedData.end_time,
      updatedData.monday, // No nesting under days anymore
      updatedData.tuesday,
      updatedData.wednesday,
      updatedData.thursday,
      updatedData.friday,
      updatedData.saturday,
      updatedData.sunday,
      updatedData.lab,
      schedule_id
    );

    console.log("Schedule updated successfully!");
    return { success: true, message: "Schedule was updated successfully." };
  } catch (error) {
    console.log("Database update error:", error);
    return { success: false, message: "Failed to update schedule." };
  }
}


// export function getScheduleWithInstructorForAttendance(lab) {
//   const query = db.prepare(`
//     SELECT schedule.*, instructor.*
//     FROM schedule
//     JOIN instructor ON schedule.instructor_ID = instructor.instructor_ID
//     WHERE 
//       CASE strftime('%w', 'now', 'localtime')
//         WHEN '0' THEN sunday
//         WHEN '1' THEN monday
//         WHEN '2' THEN tuesday
//         WHEN '3' THEN wednesday
//         WHEN '4' THEN thursday
//         WHEN '5' THEN friday
//         WHEN '6' THEN saturday
//       END = 1 AND schedule.lab = ?;
//   `);

//   try {
//     //console.log("Executing query to fetch schedule with instructor...");
//     const result = query.all(lab);
    
//     if (result.length) {
//       // Data found
//       //console.log("Data retrieved successfully:");
//       // console.log(result);
//       return result;
//     } else {
//       // No data found
//       console.log("No schedule found for LAB IOT today.");
//     }
//   } catch (error) {
//     console.log("Error fetching schedule with instructor:", error);
//   }
// }





export function getScheduleWithInstructorForAttendance(lab) {
  const query = db.prepare(`
    SELECT schedule.*, instructor.*
    FROM schedule
    JOIN instructor ON schedule.instructor_ID = instructor.instructor_ID
    WHERE 
      CASE strftime('%w', 'now', 'localtime')
        WHEN '0' THEN sunday
        WHEN '1' THEN monday
        WHEN '2' THEN tuesday
        WHEN '3' THEN wednesday
        WHEN '4' THEN thursday
        WHEN '5' THEN friday
        WHEN '6' THEN saturday
      END = 1 
      AND schedule.lab = ?
      AND time('now', 'localtime') BETWEEN schedule.start_time AND schedule.end_time
      LIMIT 1;
  `);

  try {
    const result = query.all(lab);

    if (result.length) {
      return result;
    } else {
      console.log("No schedule found for LAB IOT at the current time.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching schedule with instructor:", error);
    return [];
  }
}



// Create Attendance Table for instructor schedule
export async function createAttendanceTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS attendance (
      attendance_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      schedule_ID INTEGER NOT NULL,
      instructor_ID INTEGER NOT NULL,
      rfid TEXT,  -- Define rfid column with TEXT data type
      status BOOLEAN DEFAULT FALSE,
      log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (schedule_ID) REFERENCES schedule(id),
      FOREIGN KEY (instructor_ID) REFERENCES instructor(instructor_ID)
    );
  `;

  try {
    await db.exec(query);
    console.log("Attendance table created successfully or already exists.");
  } catch (error) {
    if (
      error.code === "SQLITE_ERROR" &&
      error.message.includes("table attendance already exists")
    ) {
      console.log("The attendance table already exists. No changes made.");
    } else {
      console.error("Error creating attendance table:", error);
    }
  }
}


// Insert Attendance Record
export async function insertAttendance(schedule_ID, instructor_ID, rfid) {
  const query = `
    INSERT INTO attendance (schedule_ID, instructor_ID, rfid)
    VALUES (?, ?, ?);
  `;

  try {
    const stmt = db.prepare(query);
    const result = stmt.run(schedule_ID, instructor_ID, rfid);
    console.log("Attendance record inserted successfully:", result);
    return result; // You can return the result if needed
  } catch (error) {
    console.error("Error inserting attendance record:", error);
    throw error; // You can choose to throw the error or handle it as needed
  }
}



export async function checkAttendance(schedule_ID, instructor_ID, lab) {
  const query = `
    SELECT COUNT(*) AS count
    FROM attendance
    INNER JOIN schedule ON attendance.schedule_ID = schedule.id
    WHERE attendance.schedule_ID = ?
      AND attendance.instructor_ID = ?
      AND DATE(attendance.log_time) = DATE('now')
      AND schedule.lab = ?;
  `;

  try {
    const stmt = db.prepare(query);
    const result = stmt.get(schedule_ID, instructor_ID, lab);
    console.log("Attendance check result:", result);
    return result.count > 0; // Return true if attendance exists, otherwise false
  } catch (error) {
    console.error("Error checking attendance:", error);
    throw error; // Throw the error or handle it as needed
  }
}
