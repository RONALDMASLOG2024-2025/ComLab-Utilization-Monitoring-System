import React, { useState, useEffect } from "react";

export default function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [rfid, setRfid] = useState("");
  const [message, setMessage] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const [editInstructor, setEditInstructor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [exID, setexID] = useState();

  useEffect(() => {
    handleGetInstructors();
  }, []);

  useEffect(() => {
    setFilteredInstructors(
      instructors.filter((instructor) =>
        `${instructor.firstName} ${instructor.middleName} ${instructor.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, instructors]);

  // Clear the message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount or when message changes
    }
  }, [message]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !id || !email || !gender || !rfid) {
      setMessage("All fields are required.");
      return;
    }
    const response = await window.api.insertInstructor(
      id,
      firstName,
      middleName,
      lastName,
      gender,
      email,
      rfid
    );
    if (response.success) {
      setMessage("Instructor added successfully!");
      resetForm();
      handleGetInstructors();
    } else {
      setMessage(
        response.message || "An error occurred while adding the instructor."
      );
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !gender || !rfid || !exID) {
      setMessage("All fields are required.");
      return;
    }
    
   

    const response = await window.api.updateInstructor(
      exID,
      editInstructor.instructor_ID,
      firstName,
      middleName,
      lastName,
      gender,
      email,
      rfid
    );
    if (response.success) {
      setMessage("Instructor updated successfully!");
      resetForm();
      setIsEditModalOpen(false);
      handleGetInstructors();
    } else {
      setMessage(
        response.message || "An error occurred while updating the instructor."
      );
    }
  };

  const handleGetInstructors = async () => {
    const response = await window.api.getInstructors();
    if (response.success) {
      setInstructors(response.instructors);
      setFilteredInstructors(response.instructors);
    } else {
      setMessage("Failed to load instructors.");
    }
  };

  const handleDeleteInstructor = async (instructor_ID) => {
    const response = await window.api.deleteInstructor(instructor_ID);
    if (response.success) {
      setMessage("Instructor deleted successfully!");
      handleGetInstructors();
    } else {
      setMessage(
        response.message || "An error occurred while deleting the instructor."
      );
    }
  };

  const handleEditInstructor = (instructor) => {
    setEditInstructor(instructor);
    setFirstName(instructor.firstName);
    setMiddleName(instructor.middleName);
    setLastName(instructor.lastName);
    setId(instructor.instructor_ID);
    setGender(instructor.gender);
    setEmail(instructor.email);
    setRfid(instructor.rfid);
    setIsEditModalOpen(true);
    setexID(instructor.instructor_ID);
  };

  const resetForm = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setId("");
    setGender("");
    setEmail("");
    setRfid("");
  };

  const toggleAddModal = () => {
    resetForm();
    setMessage(""); // Reset message when closing the modal
    setIsModalOpen(!isModalOpen);
  };

  const toggleEditModal = () => {
    resetForm();
    setMessage(""); // Reset message when closing the modal
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <div className="bg-white w-full h-fit rounded-lg bg-opacity-85 mt-2 shadow-lg p-6">
      <div className="flex items-center gap-2 justify-center mb-4">
        <h1 className="font-bold text-2xl text-gray-700">
          Employee Management
        </h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none"
          onClick={toggleAddModal}
        >
          Add Instructor
        </button>
        <input
          type="search"
          placeholder="Search"
          className="p-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full border border-gray-200 text-left bg-white shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4 border-b">ID</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Gender</th>
              <th className="py-3 px-4 border-b">RFID</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstructors.length > 0 ? (
              filteredInstructors.map((instructor) => (
                <tr
                  key={instructor.instructor_ID}
                  className="hover:bg-gray-50 text-gray-700"
                >
                  <td className="py-3 px-4 border-b">
                    {instructor.instructor_ID}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {`${instructor.firstName} ${instructor.middleName} ${instructor.lastName}`}
                  </td>
                  <td className="py-3 px-4 border-b">{instructor.email}</td>
                  <td className="py-3 px-4 border-b">{instructor.gender}</td>
                  <td className="py-3 px-4 border-b">{instructor.rfid}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => handleEditInstructor(instructor)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteInstructor(instructor.instructor_ID)
                      }
                      className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center border-b">
                  No instructors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Instructor Modal */}
      {isModalOpen && (
        <div className="rounded-lg fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white mt-80 rounded-lg shadow-lg p-6 w-full max-w-lg mx-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Add Instructor
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />
              <input
                type="text"
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />
              <input
                type="number"
                placeholder="Employee ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />
              <input
                type="text"
                placeholder="RFID"
                value={rfid}
                onChange={(e) => setRfid(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />
              {message && (
                <div
                  className={`mt-4 p-2 rounded-md text-white ${
                    message.includes("success") ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {message}
                </div>
              )}
              <div className="flex justify-between gap-2 mt-4">
                <button
                  onClick={handleAddSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Add Instructor
                </button>
                <button
                  onClick={toggleAddModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Instructor Modal */}
      {isEditModalOpen && (
        <div className="rounded-lg fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white mt-80 rounded-lg shadow-lg p-6 w-full max-w-lg mx-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Edit Instructor
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />
              <input
                type="text"
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />
              <input
                type="number"
                placeholder="Employee ID"
                value={exID}
                onChange={(e) => setexID(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />
              <input
                type="text"
                placeholder="RFID"
                value={rfid}
                onChange={(e) => setRfid(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />

              {message && (
                <div
                  className={`mt-4 p-2 rounded-md text-white ${
                    message.includes("success") ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="flex justify-between gap-2 mt-4">
                <button
                  onClick={handleUpdateSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Update Instructor
                </button>
                <button
                  onClick={toggleEditModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
