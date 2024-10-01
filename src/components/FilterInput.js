import React, { useState, useRef, useEffect } from 'react';
import '../styles/FilterInput.css';
import downArrow from '../assets/down.svg'; // Import your down arrow SVG

const FilterInput = ({setGroupBy,setSortBy,groupBy,sortBy}) => {
  const [isInputOpen, setInputOpen] = useState(false);
  const inputRef = useRef(null);

  const toggleInput = () => {
    setInputOpen(!isInputOpen);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setInputOpen(false);
    }
  };

  useEffect(() => {
    if (isInputOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInputOpen]);

  useEffect(() => {
    if(groupBy) localStorage.setItem('groupBy', groupBy);
    if(sortBy) localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  return (
    <div className="user-input-container">
      <button onClick={toggleInput} className="open-input-button">
        Display
        <img
          src={downArrow}
          alt="dropdown arrow"
          className={`dropdown-arrow ${isInputOpen ? 'rotate' : ''}`}
        />
      </button>

      {isInputOpen && (
        <div ref={inputRef} className="input-field-container">
          <div className="dropdown-wrapper">
            <label htmlFor="dropdown1">Grouping</label>
            <div className="dropdown">
              <select value={groupBy} id="dropdown1" className="dropdown-select" onChange={(e)=>setGroupBy(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
              <img src={downArrow} alt="dropdown arrow" className="dropdown-arrow-select" />
            </div>
          </div>

          <div className="dropdown-wrapper">
            <label htmlFor="dropdown2">Ordering</label>
            <div className="dropdown">
              <select value={sortBy} id="dropdown2" className="dropdown-select" onChange={(e)=>setSortBy(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
              <img src={downArrow} alt="dropdown arrow" className="dropdown-arrow-select" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterInput;
