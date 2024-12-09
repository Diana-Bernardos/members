// src/App.jsx
import React, { useState, useEffect } from 'react';
import MemberForm from './componets/MemberForm';
import MemberList from './componets/MemberList';

const App = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/members');
      if (!response.ok) throw new Error('Error al cargar miembros');
      const data = await response.json();
      setMembers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Gestión de Miembros
        </h1>

        <MemberForm onMemberAdded={fetchMembers} />

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-8">
            {error}
          </div>
        )}

        <MemberList members={members} />
      </div>
    </div>
  );
};

export default App;
