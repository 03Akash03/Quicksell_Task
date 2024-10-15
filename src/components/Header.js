import React, { useState, useEffect, useRef } from 'react';

function Header({ groupBy, sortBy, onGroupChange, onSortChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="controls">
        <button className="display-button" onClick={toggleDropdown}>
          Display
        </button>
        {isDropdownOpen && (
          <div className="dropdown-content" ref={dropdownRef}>
            <div className="grouping">
              <label htmlFor="group-by">Grouping: </label>
              <select
                id="group-by"
                value={groupBy}
                onChange={(e) => onGroupChange(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="sorting">
              <label htmlFor="sort-by">Ordering: </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
              >
                <option value="title">Title</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
