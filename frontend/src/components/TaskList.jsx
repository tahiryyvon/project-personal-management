import React from 'react';

const TaskList = ({ tasks, onStatusChange }) => {
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await fetch(`http://localhost:3000/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ status: newStatus })
      });
      onStatusChange && onStatusChange();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO': return '#ffc107';
      case 'IN_PROGRESS': return '#17a2b8';
      case 'DONE': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div>
      <h2>Liste des Tâches</h2>
      {tasks.map(task => (
        <div 
          key={task.id} 
          className="task-card"
          style={{
            border: '1px solid #ddd',
            margin: '10px',
            padding: '15px',
            borderRadius: '5px'
          }}
        >
          <h3>{task.title}</h3>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Échéance:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
          <p><strong>Assigné à:</strong> {task.employee ? task.employee.name : 'Non assigné'}</p>
          
          <div>
            <strong>Statut: </strong>
            <select 
              value={task.status} 
              onChange={(e) => handleStatusChange(task.id, e.target.value)}
              style={{ 
                marginLeft: '10px',
                padding: '5px',
                backgroundColor: getStatusColor(task.status),
                color: 'white',
                border: 'none',
                borderRadius: '3px'
              }}
            >
              <option value="TODO">À faire</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="DONE">Terminé</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;