import React from 'react';

// Helper function to safely format ISO strings, Timestamps, or Arrays
const formatDate = (dateValue) => {
  if (!dateValue) return 'N/A';

  let date;

  // Handles Java array serialization [YYYY, MM, DD, HH, mm, ss]
  if (Array.isArray(dateValue)) {
    const [year, month, day, hour = 0, minute = 0, second = 0] = dateValue;
    date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  } else {
    // Truncate sub-millisecond nanoseconds if present (e.g., .123456789Z -> .123Z)
    const cleanedString = typeof dateValue === 'string' 
      ? dateValue.replace(/(\.\d{3})\d+/, '$1') 
      : dateValue;

    date = new Date(cleanedString);
  }

  // Check if valid Date object
  if (isNaN(date.getTime())) {
    return String(dateValue); // Fallback: display raw value if parsing fails
  }

  return date.toLocaleString();
};

const UserList = ({ users }) => {
  if (!users || users.length === 0) {
    return <p className="empty-message">No users found.</p>;
  }

  return (
    <div className="track-list-container">
      <div className="track-list-header">
        <div>
          <h2>Users</h2>
          <p className="subheading">Registered application users</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="track-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td className="track-name">{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge">
                    {formatDate(user.createdAt ||user.created_at)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;