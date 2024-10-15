import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Board from './components/Board';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState({});
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = response.data.tickets || [];
        const userData = response.data.users || {};
        setTickets(data);
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Header groupBy={groupBy} sortBy={sortBy} onGroupChange={setGroupBy} onSortChange={setSortBy} />
      <Board tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}

export default App;
