import './App.css';
import KanbanCard from './components/KanbanCard';
import PriorityDisplay from './components/PriorityDisplay';
import StateDisplay from './components/StateDisplay';
import UserTaskDisplay from './components/UserTaskDisplay';
import FilterInput from './components/FilterInput';
import { useEffect, useState } from 'react';

function App() {
  const [groupBy,setGroupBy] = useState(null);
  const [sortBy,setSortBy] = useState(null);

  // fetching th api data
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortedByName, setSortedByName] = useState([]);
  const [sortedByPriority, setSortedByPriority] = useState([]);

  // for getting filtering input data from local storage
  useEffect(()=>{
    console.log(localStorage.getItem('groupBy'));
    const storedGroupBy = localStorage.getItem('groupBy')||"priority";
    const storedSortBy = localStorage.getItem('sortBy') || "priority";
    setGroupBy(storedGroupBy);
    setSortBy(storedSortBy);
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        setTickets(data.tickets);
        setUsers(data.users);

        // Sort tickets by name
        const sortedByName = [...data.tickets].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setSortedByName(sortedByName);

        // Sort tickets by priority
        const sortedByPriority = [...data.tickets].sort((a, b) => a.priority - b.priority);
        setSortedByPriority(sortedByPriority);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="App">
      <FilterInput setGroupBy={setGroupBy} setSortBy={setSortBy} groupBy={groupBy} sortBy={sortBy} />
      {groupBy=="status"&&<StateDisplay tickets={sortBy==="priority"?sortedByPriority:sortedByName} users={users}/>}

      {groupBy=="priority"&&<PriorityDisplay tickets={sortBy==="priority"?sortedByPriority:sortedByName} users={users} />}

      {groupBy=="user"&&<UserTaskDisplay tickets={sortBy==="priority"?sortedByPriority:sortedByName} users={users}/>}

    </div>
  );
}

export default App;
