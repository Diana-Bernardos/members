import React from 'react';

const MemberList = ({ members }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => (
        <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {member.photo_url && (
            <img
              src={`http://localhost:5001${member.photo_url}`}
              alt={member.name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-gray-600 text-sm">
              {new Date(member.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberList;