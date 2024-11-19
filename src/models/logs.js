import db from "./connectionDB.mjs";

// Function to get filtered attendance logs
export function getAttendanceLogs() {
  const query = `
    WITH FilteredAttendance AS (
        SELECT DISTINCT
            a.schedule_ID,
            a.instructor_ID,
            a.rfid,
            DATE(a.log_time) AS log_date, -- Extract just the date for filtering
            s.lab -- Assuming 'lab' is a column in the schedule table
        FROM
            attendance a
        INNER JOIN
            schedule s ON a.schedule_ID = s.id -- Join using schedule.id
    )
    SELECT
        'daily' AS period,
        log_date,
        lab,
        COUNT(*) AS total_attendance
    FROM
        FilteredAttendance
    GROUP BY
        log_date, lab

    UNION ALL

    SELECT
        'weekly' AS period,
        strftime('%Y-%W', log_date) AS log_week, -- Group by year-week
        lab,
        COUNT(*) AS total_attendance
    FROM
        FilteredAttendance
    GROUP BY
        log_week, lab

    UNION ALL

    SELECT
        'monthly' AS period,
        strftime('%Y-%m', log_date) AS log_month, -- Group by year-month
        lab,
        COUNT(*) AS total_attendance
    FROM
        FilteredAttendance
    GROUP BY
        log_month, lab

    UNION ALL

    SELECT
        'yearly' AS period,
        strftime('%Y', log_date) AS log_year, -- Group by year
        lab,
        COUNT(*) AS total_attendance
    FROM
        FilteredAttendance
    GROUP BY
        log_year, lab;
  `;

  try {
    const stmt = db.prepare(query);
    const results = stmt.all(); // Get all rows
    console.log(results);
    return results; // Return the result to be sent to the renderer
  } catch (error) {
    console.error("Error executing attendance query:", error);
    throw error; // Handle or re-throw the error
  }
}
