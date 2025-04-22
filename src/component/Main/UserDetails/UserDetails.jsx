import React, { useState } from 'react';
import user from '../../../assets/auth/user.png'

const UserDetailsPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const users = [
        { id: 1, profile:user, name: 'Bashar', email: 'supportinfo@gmail.com', phone: '55555555555', joinDate: '16 Feb 2025' },
        { id: 2, profile:user, name: 'Ali', email: 'supportinfo2@gmail.com', phone: '55555555556', joinDate: '18 Feb 2025' },
        { id: 3, profile:user, name: 'Sarah', email: 'supportinfo3@gmail.com', phone: '55555555557', joinDate: '20 Feb 2025' },
        { id: 4, profile:user, name: 'John', email: 'supportinfo4@gmail.com', phone: '55555555558', joinDate: '22 Feb 2025' },
        { id: 5, profile:user, name: 'Emma', email: 'supportinfo5@gmail.com', phone: '55555555559', joinDate: '24 Feb 2025' },
    ];

    const userDetails = selectedUser ? users.find(user => user.id === selectedUser) : users[0]; // Default to first user

    return (
        <div className="flex p-6 space-x-6">
            {/* Left Side - User Table */}
            <div className="flex-1 bg-gray-100 rounded-lg shadow-lg p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">User details</h2>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-[#309EAD] text-white">
                            <th className="px-4 py-2">#SL</th>
                            <th className="px-4 py-2">User Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`cursor-pointer ${selectedUser === user.id ? 'bg-[#A0D2D9]' : ''}`}
                                onClick={() => setSelectedUser(user.id)}
                            >
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full mr-2"
                                            src={user.profile}
                                            alt={user.name}
                                        />
                                        {user.name}
                                    </div>
                                </td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">
                                    <button className="text-[#309EAD] hover:underline">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Right Side - User Details */}
            <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Details</h2>
                <div className="flex items-center mb-4">
                    <img
                        src={user}
                        alt="User Profile"
                        className="w-24 h-24 rounded-full mr-4"
                    />
                    <div>
                        <h3 className="font-semibold text-lg text-gray-800">{userDetails.name}</h3>
                        <p className="text-sm text-gray-500">Joined on {userDetails.joinDate}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="font-semibold text-sm text-gray-600">Name</p>
                        <p>{userDetails.name}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-gray-600">Email</p>
                        <p>{userDetails.email}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-gray-600">Phone number</p>
                        <p>{userDetails.phone}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-gray-600">Joining date</p>
                        <p>{userDetails.joinDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsPage;

