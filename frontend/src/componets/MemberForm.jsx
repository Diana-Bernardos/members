import React, { useState } from 'react';

const MemberForm = ({ onMemberAdded }) => {
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('name', name);
    if (selectedFile) {
      formData.append('photo', selectedFile);
    }

    try {
      console.log('Enviando datos:', { name, file: selectedFile?.name });
      
      const response = await fetch('http://localhost:5001/api/members', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear miembro');
      }
      
      const data = await response.json();
      console.log('Respuesta exitosa:', data);
      
      setName('');
      setSelectedFile(null);
      onMemberAdded();
      alert('Miembro creado exitosamente');
    } catch (err) {
      console.error('Error en la petición:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Agregar Nuevo Miembro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingresa el nombre"
          />
        </div>
        
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
            Foto
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm p-2 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium 
            ${isLoading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {isLoading ? 'Agregando...' : 'Agregar Miembro'}
        </button>
      </form>
    </div>
  );
};

export default MemberForm;
