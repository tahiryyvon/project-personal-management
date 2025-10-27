import React from 'react';

const EmployeeList = ({ employees }) => {
  return (
    <div>
      <h2>Liste des Employés</h2>
      {employees.map(employee => (
        <div key={employee.id} className="employee-card">
          <h3>{employee.name}</h3>
          <p>Email: {employee.email}</p>
          <p>Poste: {employee.position}</p>
          <p>Tâches: {employee.tasks?.length || 0}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;