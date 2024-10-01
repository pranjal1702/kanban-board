import React from 'react';
import lowPriorityIcon from '../assets/Img - Medium Priority.svg'; 
import mediumPriorityIcon from '../assets/Img - Medium Priority.svg'; 
import highPriorityIcon from '../assets/Img - Medium Priority.svg'; 
import noPriorityIcon from '../assets/No-priority.svg'; 
import urgentPriorityColorIcon from '../assets/SVG - Urgent Priority colour.svg'; 
import addIcon from '../assets/add.svg'; 
import threeDotMenu from '../assets/3 dot menu.svg'; 

import '../styles/PriorityDisplayStyle.css';
import KanbanCard from './KanbanCard';

const priorities = [
  { level: 'No priority', icon: noPriorityIcon, value:0 },
  { level: 'Urgent', icon: urgentPriorityColorIcon, value:4 },
  { level: 'Low', icon: lowPriorityIcon,value:1 },
  { level: 'Medium', icon: mediumPriorityIcon, value:2 },
  { level: 'High', icon: highPriorityIcon, value:3 },
];

const PriorityDisplay = ({tickets,users}) => {
  return (
    <div className="container">
    {priorities.map((priority, index) => (
      <div key={index} className="priorityColumn">
        <div className="priorityHeader">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={priority.icon} alt={`${priority.level} Priority`} className="icon" />
            <span className="text">{priority.level}</span>
          </div>
          <div style={{marginRight:'10px'}}>
            <img src={addIcon} alt="Add Task" className="addIcon" />
            <img src={threeDotMenu} alt="Add Task" className="addIcon" />
            </div>
          
        </div>
        {tickets
            .filter((ticket) => ticket.priority === priority.value) 
            .map((task) => (
                <KanbanCard key={task.id} task={task} users={users} display={"priority"} />
            ))
          }
      </div>
    ))}
  </div>
  );
};

export default PriorityDisplay;
