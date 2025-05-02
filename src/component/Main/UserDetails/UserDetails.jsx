// import React, { useState } from 'react';
// import user from '../../../assets/auth/user.png'
// import { useGetsingleUserQuery } from '../../../redux/features/user/userApi';

// const UserDetailsPage = () => {
//     const [selectedUser, setSelectedUser] = useState(null);
//     const { data:allUser, isFetching, isError, error } = useGetAllUsersQuery();
//     const { data:singleUser,   }= useGetsingleUserQuery()

//     const users = [
//         { id: 1, profile:user, name: 'Bashar', email: 'supportinfo@gmail.com', phone: '55555555555', joinDate: '16 Feb 2025' },
//         { id: 2, profile:user, name: 'Ali', email: 'supportinfo2@gmail.com', phone: '55555555556', joinDate: '18 Feb 2025' },
//         { id: 3, profile:user, name: 'Sarah', email: 'supportinfo3@gmail.com', phone: '55555555557', joinDate: '20 Feb 2025' },
//         { id: 4, profile:user, name: 'John', email: 'supportinfo4@gmail.com', phone: '55555555558', joinDate: '22 Feb 2025' },
//         { id: 5, profile:user, name: 'Emma', email: 'supportinfo5@gmail.com', phone: '55555555559', joinDate: '24 Feb 2025' },
//     ];

//     const userDetails = selectedUser ? users.find(user => user.id === selectedUser) : users[0]; // Default to first user

//     return (
//         <div className="flex p-6 space-x-6">
//             {/* Left Side - User Table */}
//             <div className="flex-1 bg-gray-100 rounded-lg shadow-lg p-4">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">User details</h2>
//                 <table className="min-w-full table-auto">
//                     <thead>
//                         <tr className="bg-[#309EAD] text-white">
//                             <th className="px-4 py-2">#SL</th>
//                             <th className="px-4 py-2">User Name</th>
//                             <th className="px-4 py-2">Email</th>
//                             <th className="px-4 py-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => (
//                             <tr
//                                 key={user.id}
//                                 className={`cursor-pointer ${selectedUser === user.id ? 'bg-[#A0D2D9]' : ''}`}
//                                 onClick={() => setSelectedUser(user.id)}
//                             >
//                                 <td className="px-4 py-2">{index + 1}</td>
//                                 <td className="px-4 py-2">
//                                     <div className="flex items-center">
//                                         <img
//                                             className="w-10 h-10 rounded-full mr-2"
//                                             src={user.profile}
//                                             alt={user.name}
//                                         />
//                                         {user.name}
//                                     </div>
//                                 </td>
//                                 <td className="px-4 py-2">{user.email}</td>
//                                 <td className="px-4 py-2">
//                                     <button className="text-[#309EAD] hover:underline">View</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>


//             {/* Right Side - User Details */}
//             <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">Details</h2>
//                 <div className="flex items-center mb-4">
//                     <img
//                         src={user}
//                         alt="User Profile"
//                         className="w-24 h-24 rounded-full mr-4"
//                     />
//                     <div>
//                         <h3 className="font-semibold text-lg text-gray-800">{userDetails.name}</h3>
//                         <p className="text-sm text-gray-500">Joined on {userDetails.joinDate}</p>
//                     </div>
//                 </div>

//                 <div className="space-y-4">
//                     <div>
//                         <p className="font-semibold text-sm text-gray-600">Name</p>
//                         <p>{userDetails.name}</p>
//                     </div>
//                     <div>
//                         <p className="font-semibold text-sm text-gray-600">Email</p>
//                         <p>{userDetails.email}</p>
//                     </div>
//                     <div>
//                         <p className="font-semibold text-sm text-gray-600">Phone number</p>
//                         <p>{userDetails.phone}</p>
//                     </div>
//                     <div>
//                         <p className="font-semibold text-sm text-gray-600">Joining date</p>
//                         <p>{userDetails.joinDate}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserDetailsPage;




import React, { useState } from 'react';
import { useGetAllUsersQuery, useGetsingleUserQuery } from '../../../redux/features/user/userApi';
import user from '../../../assets/auth/user.png'; // Default user image
import { useParams } from 'react-router-dom';

const UserDetailsPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users
  const { data: allUsers , isFetching: isFetchingUsers, isError: isErrorUsers, error: errorUsers } = useGetAllUsersQuery();

  const data = allUsers?.data?.attributes
  console.log("All Users Data: ", data);

  // Fetch single user details when selected
  const { data: singleUser, isFetching: isFetchingSingleUser, isError: isErrorSingleUser, error: errorSingleUser } = useGetsingleUserQuery(selectedUser, {
    skip: !selectedUser, // Prevent query from running when no user is selected
  });

  if (isFetchingUsers) return <div>Loading Users...</div>;
  if (isErrorUsers) return <div>Error fetching users: {errorUsers?.message}</div>;

  const handleUserClick = (userId) => {
    setSelectedUser(userId); // Set selected user ID when a row is clicked
  };

  const userDetails = singleUser || {}; // Default to empty object if no user is selected

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
            {Array.isArray(data) && data.length > 0 ? (
              data.map((user, index) => (
                <tr
                  key={user.id}
                  className={`cursor-pointer ${selectedUser === user.id ? 'bg-[#A0D2D9]' : ''}`}
                  onClick={() => handleUserClick(user.id)} // Set selected user ID
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-full mr-2"
                        src={user.profile || user}
                        alt={user.name}
                      />
                      {user.name}
                    </div>
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <button className="text-[#309EAD] hover:underline">View</button> {/* View button */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Right Side - User Details */}
      <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Details</h2>
        {isFetchingSingleUser ? (
          <div>Loading User Details...</div>
        ) : isErrorSingleUser ? (
          <div>Error fetching user details: {errorSingleUser?.message}</div>
        ) : (
          <div>
            <div className="flex items-center mb-4">
              <img
                src={singleUser?.profile || user}
                alt="User Profile"
                className="w-24 h-24 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{singleUser?.name}</h3>
                <p className="text-sm text-gray-500">Joined on {singleUser?.joinDate}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-sm text-gray-600">Name</p>
                <p>{singleUser?.name}</p>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-600">Email</p>
                <p>{singleUser?.email}</p>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-600">Phone number</p>
                <p>{singleUser?.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-600">Joining date</p>
                <p>{singleUser?.joinDate}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;

