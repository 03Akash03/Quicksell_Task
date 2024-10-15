import React from 'react';

function GroupingSelector({ groupBy, onGroupChange }) {
  return (
    <div className="grouping-selector">
      <label>Group by: </label>
      <select value={groupBy} onChange={(e) => onGroupChange(e.target.value)}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}

export default GroupingSelector;
