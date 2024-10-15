import React from 'react';
import Card from './Card'; 

const icons = {
  Backlog: '🌀', 
  Todo: '✅', 
  'In Progress': '🔄', 
  Done: '✔️', 
  Cancelled: '❌',
  Urgent: '⚠️',
  High: '📈', 
  Medium: '🔍', 
  Low: '⬇️', 
  'No priority': '🚫', 
};

function Board({ tickets, users, groupBy, sortBy }) {
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4: return 'Urgent';
      case 3: return 'High';
      case 2: return 'Medium';
      case 1: return 'Low';
      case 0: return 'No priority';
      default: return 'Unknown';
    }
  };

  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown User'; 
  };

  const groupTickets = (tickets) => {
    // Initialize groups for status
    const statusGroups = {
      Backlog: [],
      Todo: [],
      'In Progress': [],
      Done: [],
      Cancelled: [],
    };

    // Initialize groups for users
    const userGroups = {};

    tickets.forEach(ticket => {
      const statusKey = ticket.status; 
      const userName = getUserName(ticket.userId); 

      // Group by status only
      if (groupBy === 'status') {
        if (statusKey === 'Backlog') {
          statusGroups.Backlog.push(ticket);
        } else if (statusKey === 'Todo') {
          statusGroups.Todo.push(ticket);
        } else if (statusKey === 'In progress') {
          statusGroups['In Progress'].push(ticket);
        } else if (statusKey === 'Done') {
          statusGroups.Done.push(ticket);
        } else {
          statusGroups.Cancelled.push(ticket);// All other statuses go to Backlog
        }
      }

      // Group by user
      if (groupBy === 'user') {
        if (!userGroups[userName]) {
          userGroups[userName] = [];
        }
        userGroups[userName].push(ticket);
      }
    });

    // Return appropriate groups based on grouping type
    if (groupBy === 'status') {
      return statusGroups; // Return only the status groups
    }

    if (groupBy === 'user') {
      return userGroups; // Return only the user groups
    }

    // If grouping by priority, initialize those groups
    if (groupBy === 'priority') {
      const priorityGroups = {
        Urgent: [],
        High: [],
        Medium: [],
        Low: [],
        'No priority': [],
      };

      tickets.forEach(ticket => {
        const priorityLabel = getPriorityLabel(ticket.priority);
        priorityGroups[priorityLabel].push(ticket);
      });

      return priorityGroups;
    }

    return {}; 
  };

  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority; 
      }
      return a.title.localeCompare(b.title);
    });
  };

  const groupedTickets = groupTickets(tickets);
  const sortedGroupedTickets = Object.keys(groupedTickets).map(groupKey => ({
    key: groupKey,
    tickets: sortTickets(groupedTickets[groupKey]),
  }));

  return (
    <div className="board">
      {sortedGroupedTickets.map((group) => (
        <div key={group.key} className="group">
          <h2>
            {icons[group.key] || '❓'} {group.key} {/* Adding icon before the group title */}
          </h2>
          {group.tickets.map(ticket => (
            <Card key={ticket.id} ticket={ticket} /> 
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
