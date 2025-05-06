import React, { useState } from 'react';
import { useGetAllUsersQuery, useGetsingleUserQuery } from '../../../redux/features/user/userApi';
import user from '../../../assets/auth/user.png'; // Default user image
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'antd'; // Import Modal and Button from Ant Design
import imageApi from '../../../redux/baseApi/imageApi'; // Base URL for image
import moment from 'moment';

const UserDetailsPage = () => {
  const { id } = useParams(); // Retrieve user ID from the URL parameters
  console.log(id);

  const [selectedUser, setSelectedUser] = useState(id); // Initially select the user if the ID is available in the URL
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  // Fetch all users from the API
  const { data: allUsers, isFetching: isFetchingUsers, isError: isErrorUsers, error: errorUsers } = useGetAllUsersQuery();

  const data = allUsers?.data?.attributes?.results || []; // All users data from the API

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


  const [selectedUserInfo, setSelectedUserInfo] = useState({});

  const handleModalOpen = (user) => {

    setSelectedUserInfo(user)
    setIsModalVisible(true); // Open modal
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Close modal
  };

  const userDetails = singleUser || {}; // Default to empty object if no user is selected

  return (
    <div className="flex p-6 space-x-6">
      {/* Left Side - User Table */}
      <div className="flex-1 bg-gray-100 rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">User details</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-[#309EAD] text-white text-left">
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
                        src={imageApi + user?.profileImage || user}
                        alt={user.name}
                      />
                      {user?.fullName}
                    </div>
                  </td>
                  <td className="px-4 py-2">{user?.email}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-[#309EAD] hover:underline"
                      onClick={() => handleModalOpen(user)} // Open modal on click
                    >
                      View
                    </button> {/* View button */}
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

      {/* Modal for User Details */}
      <Modal
        title="User Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <img
              src={imageApi + selectedUserInfo?.profileImage || user} // Dynamically display profile image
              alt="User Profile"
              className="w-24 h-24 rounded-full mr-4"
            />
            <div className=''>
              <h3 className="font-semibold text-lg text-gray-800">{selectedUserInfo?.fullName}</h3>
              <p className="text-sm text-gray-500">Joined on {moment(selectedUserInfo?.createdAt).format('lll')}</p>
            </div>
          </div>
          <div className='flex items-center justify-between '>
            <p className="font-semibold text-sm text-gray-600">Email</p>
            <p>{selectedUserInfo?.email}</p>
          </div>
          <div className='flex items-center justify-between '>
            <p className="font-semibold text-sm text-gray-600">Phone number</p>
            <p>{selectedUserInfo?.phoneNumber}</p>
          </div>
          <div className='flex items-center justify-between '>
            <p className="font-semibold text-sm text-gray-600">Joining date</p>
            <p>{selectedUserInfo?.createdAt}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserDetailsPage;
