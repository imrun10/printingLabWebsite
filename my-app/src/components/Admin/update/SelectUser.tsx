import React, { useState } from 'react';

interface SelectUserProps {
    onSelectUser: (selectedUser: string) => void;
}

const SelectUser: React.FC<SelectUserProps> = ({ onSelectUser }) => {
    const [selectedUser, setSelectedUser] = useState('');

    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedUser(selectedValue);
        onSelectUser(selectedValue);
    };

    return (
        <div>
            <label htmlFor="userSelect">Select User:</label>
            <select id="userSelect" value={selectedUser} onChange={handleUserChange}>
                <option value="">-- Select User --</option>
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
                <option value="user3">User 3</option>
            </select>
        </div>
    );
};

export default SelectUser;