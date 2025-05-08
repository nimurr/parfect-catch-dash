import { useState } from "react";
import { ConfigProvider, Modal, Space, Table } from "antd";
import moment from "moment";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";

const RecentTransactions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  

  const { data: userData, isFetching, isError, error } = useGetAllUsersQuery();

  const data = userData?.data?.attributes?.results?.slice(0, 10)

   

  // console.log(userData?.data?.attributes?.results)

  const showModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  // const data = [
  //   {
  //     id: 1,
  //     accountID: 2010,
  //     image: { url: "https://randomuser.me/api/portraits/men/1.jpg" },
  //     transactionId: "TRX001",
  //     firstName: "John",
  //     lastName: "Doe",
  //     gender: "Male",
  //     email: "doe@example.com",
  //     phone: "123-456-7890",
  //     date: "2023-11-01",
  //   },
  //   {
  //     id: 2,
  //     accountID: 2010,
  //     image: { url: "https://randomuser.me/api/portraits/women/1.jpg" },
  //     transactionId: "TRX002",
  //     firstName: "Jane",
  //     lastName: "Smith",
  //     gender: "Female",
  //     email: "th@example.com",
  //     phone: "987-654-3210",
  //     date: "2023-10-25",
  //   },
  //   {
  //     id: 3,
  //     accountID: 2020,
  //     image: { url: "https://randomuser.me/api/portraits/men/2.jpg" },
  //     transactionId: "TRX003",
  //     firstName: "Mike",
  //     lastName: "Brown",
  //     gender: "Male",
  //     email: "mikeb@example.com",
  //     phone: "555-123-4567",
  //     date: "2023-10-20",
  //   },
  //   {
  //     id: 4,
  //     accountID: 2021,
  //     image: { url: "https://randomuser.me/api/portraits/women/2.jpg" },
  //     transactionId: "TRX004",
  //     firstName: "Emily",
  //     lastName: "Davis",
  //     gender: "Female",
  //     email: "emilyd@example.com",
  //     phone: "444-555-6666",
  //     date: "2023-11-05",
  //   },
  //   {
  //     id: 5,
  //     accountID: 2022,
  //     image: { url: "https://randomuser.me/api/portraits/men/3.jpg" },
  //     transactionId: "TRX005",
  //     firstName: "Chris",
  //     lastName: "Wilson",
  //     gender: "Male",
  //     email: "chrisw@example.com",
  //     phone: "111-222-3333",
  //     date: "2023-11-10",
  //   },
  // ];


  const columns = [
    {
      title: "#SL",
      dataIndex: "si",
      key: "si",
      sorter: (a, b) => a.si - b.si, // Sorting by serial number (numeric)
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName?.localeCompare(b.firstName), // Sorting alphabetically
      render: (text) => text || "N/A", // Fallback for missing data
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email?.localeCompare(b.email), // Sorting alphabetically
      render: (text) => text || "N/A", // Fallback for missing data
    },
    {
      title: "CallingCode",
      dataIndex: "callingCode",
      key: "callingCode",
      sorter: (a, b) => a.callingCode?.localeCompare(b.callingCode), // Sorting alphabetically
      render: (text) => text || "N/A", // Fallback for missing data
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phoneNumber",
      sorter: (a, b) => a.phone?.localeCompare(b.phoneNumber), // Sorting alphabetically
      render: (text) => text || "N/A", // Fallback for missing data
    },
   
    {
      title: "Joined Date Time",
      dataIndex: "date",
      key: "createdAt",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(), // Sorting by Unix timestamp
      render: (text) => (text ? moment(text).format("DD MMM YYYY") : "N/A"), // Fallback for missing date
      responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <IoMdInformationCircleOutline
            onClick={() => showModal(record)}
            style={{ fontSize: "20px", cursor: "pointer" }}
            className="text-[#000]"
          />
        </Space>
      ),
      sorter: false, // Actions are not sortable
    },
  ];


  const dataSource = data?.map((user, index) => ({
    key: user.id,
    si: index + 1,
    firstName: user?.firstName,
    lastName: user?.lastName,
    accountID: user?.accountID,
    gender: user?.gender,
    email: user?.email,
    callingCode: user?.callingCode,
    phone: user?.phoneNumber,
    imageUrl: user?.image?.url,
    date: user?.createdAt, // Fixed here
  }));
 
  return (
    <div className="w-full col-span-full md:col-span-6 bg-white rounded-lg mb-10">
      <h2 className="font-semibold py-3">Recent User</h2>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#2C909D",
              headerColor: "#000000",
              headerBorderRadius: 5,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 500 }}
        />
      </ConfigProvider>

      {/* Modal */}
      <Modal
        open={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        centered
        bodyStyle={{ padding: "15px" }}
      >
        <div className="text-black bg-primary">
          <h1 className="text-center text-2xl font-semibold my-2">
            Recent User Details
          </h1>
          <div className="p-5">
            <div className="flex justify-between py-3 border-b">
              <p>Transaction ID :</p>
              <p>{selectedTransaction?.key || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>First Name :</p>
              <p>{selectedTransaction?.firstName || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Last Name :</p>
              <p>{selectedTransaction?.lastName || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Gender :</p>
              <p>{selectedTransaction?.gender || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Email :</p>
              <p>{selectedTransaction?.email || "N/A"}</p>
            </div>
         
            <div className="flex justify-between py-3 border-b">
              <p>Phone:</p>
              <p>{selectedTransaction?.callingCode + (selectedTransaction?.phone || "N/A")}</p>
            </div>
            <div className="flex justify-between py-3">
              <p>Date :</p>
              <p>
                {selectedTransaction?.date
                  ? moment(selectedTransaction.date).format("DD MMM YYYY")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RecentTransactions;
