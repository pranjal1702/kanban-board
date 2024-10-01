import React from 'react';
import addIcon from '../assets/add.svg'; 
import threeDotMenu from '../assets/3 dot menu.svg'; 

import '../styles/UserDisplayStyle.css'; 
import KanbanCard from './KanbanCard';

const getInitials = (name) => {
  return `${name[0]+name[1]}`.toUpperCase();
};

const UserTaskDisplay = ({tickets,users}) => {
  return (
    <div className="container">
      {users.map((user) => (
        <div key={user.id} className="priorityColumn">
          <div className="priorityHeader">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="userInitials">{getInitials(user.name)}</div>
              <span className="text">{user.name}</span>
            </div>
            <div style={{ marginRight: '10px' }}>
              <img src={addIcon} alt="Add Task" className="addIcon" />
              <img src={threeDotMenu} alt="Options" className="addIcon" />
            </div>
          </div>
          {tickets
            .filter((ticket) => ticket.userId === user.id) 
            .map((task) => (
                <KanbanCard key={task.id} task={task} users={users} display={"user"} />
            ))
          }
        </div>
      ))}
    </div>
  );
};

export default UserTaskDisplay;