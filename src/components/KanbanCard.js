import React, { useEffect, useState } from 'react'
import '../styles/KanbanCardStyle.css'

import backlogIcon from '../assets/Backlog.svg'; 
import todoIcon from '../assets/To-do.svg'; 
import inProgressIcon from '../assets/in-progress.svg'; 
import doneIcon from '../assets/Done.svg'; 
import cancelledIcon from '../assets/Cancelled.svg'; 
import lowPriorityIcon from '../assets/Img - Medium Priority.svg'; 
import mediumPriorityIcon from '../assets/Img - Medium Priority.svg'; 
import highPriorityIcon from '../assets/Img - Medium Priority.svg'; 
import noPriorityIcon from '../assets/No-priority.svg'; 
import urgentPriorityGreyIcon from '../assets/SVG - Urgent Priority grey.svg';



const statesToIcon={
  'Backlog': backlogIcon,
  'Todo': todoIcon,
  'In progress': inProgressIcon,
  'Done': doneIcon,
  'Cancelled': cancelledIcon,
}



const prioritiesToIcon=[noPriorityIcon,lowPriorityIcon,mediumPriorityIcon,highPriorityIcon,urgentPriorityGreyIcon];

export default function KanbanCard({task,users,display}) {
    // console.log(users);
    const [initials,setInitials]=useState("AB");
    useEffect(()=>{
      const user = users.find(user => user.id === task.userId);
      setInitials(user.name[0]+user.name[1]);
    },[users]);
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{task.id}</span>
        {display=="user"||(<div className="user-initials">{initials}</div>)}
      </div>
      <div style={{display:'flex',alignItems:'start'}}>
        {display=="state"||(<img  style={{marginTop:'2px'}} src={statesToIcon[task.status]}  className="icon image-size" />)}
        <h3 className="card-title">{task.title}</h3>
      </div>
      
      <div className="card-footer">
        <div >
          {display=="priority"||<img  style={{marginTop:'1px'}} src={prioritiesToIcon[task.priority]}  className="icon image-size" />}
        </div>
        {task.tag.map((elem)=>(
          <div className="card-label">
            {elem}
          </div>
        ))
        }
      </div>
    </div>
  )
}
