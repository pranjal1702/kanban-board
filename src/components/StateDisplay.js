import React from 'react';
import backlogIcon from '../assets/Backlog.svg'; 
import todoIcon from '../assets/To-do.svg'; 
import inProgressIcon from '../assets/in-progress.svg'; 
import doneIcon from '../assets/Done.svg'; 
import cancelledIcon from '../assets/Cancelled.svg'; 
import addIcon from '../assets/add.svg'; 
import threeDotMenu from '../assets/3 dot menu.svg'; 

import '../styles/StateDisplayStyle.css'; 
import KanbanCard from './KanbanCard';

const states = [
  { level: 'Backlog', icon: backlogIcon },
  { level: 'Todo', icon: todoIcon },
  { level: 'In progress', icon: inProgressIcon },
  { level: 'Done', icon: doneIcon },
  { level: 'Cancelled', icon: cancelledIcon },
];

const StateDisplay = ({tickets,users}) => {
  return (
    <div className="container">
      {states.map((state, index) => (
        <div key={index} className="priorityColumn">
          <div className="priorityHeader">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={state.icon} alt={`${state.level}`} className="icon" />
              <span className="text">{state.level}</span>
            </div>
            <div style={{ marginRight: '10px' }}>
              <img src={addIcon} alt="Add Task" className="addIcon" />
              <img src={threeDotMenu} alt="Add Task" className="addIcon" />
            </div>
          </div>
          {tickets
            .filter((ticket) => ticket.status === state.level) 
            .map((task) => (
                <KanbanCard key={task.id} task={task} users={users} display={"state"} />
            ))
          }

        </div>
      ))}
    </div>
  );
};

export default StateDisplay;
