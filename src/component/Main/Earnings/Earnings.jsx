import { useState } from "react";
import { Table, Modal, Input, DatePicker, ConfigProvider, Form } from "antd";
import { IoIosSearch } from "react-icons/io";
import moment from "moment";
import { IoEyeSharp } from "react-icons/io5";


const { Item } = Form;

const Earnings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  // const [searchText, setSearchText] = useState("");
  // const [selectedDate, setSelectedDate] = useState(null);

  const mockData = [
    {
      id: "1",
      fullName: "John Doe",
      accountID: 2010,
      gender: "Male",
      phonNumber: 4567-7894,
      email: "info@gmail.com",
      createdAt: "2022-01-01T00:00:00Z",
      amount: 100,
      paymentType: "Credit Card",
      location: "New York",
    },
    {
      id: "2",
      fullName: "Jane Smith",
      accountID: 2011,
      gender: "Female",
      phonNumber: 4567-7894,
      email: "info@gmail.com",
      createdAt: "2022-01-02T00:00:00Z",
      amount: 150,
      paymentType: "Debit Card",
      location: "Los Angeles",
    },
    {
      id: "3",
      fullName: "Michael Johnson",
      accountID: 2012,
      gender: "Male",
      phonNumber: 4567-7894,
      email: "info@gmail.com",
      createdAt: "2022-01-03T00:00:00Z",
      amount: 200,
      paymentType: "Bank Transfer",
      location: "Chicago",
    },
    // Add location for the remaining records...
  ];

  const dataSource = mockData.map((record, index) => ({
    id: index + 1,
    trxId: record.id,
    fullName: record.fullName,
    accountID: record.accountID,
    createdAt: record.createdAt,
    email: record.email,
    phonNumber: record.phonNumber,
    amount: `$${record.amount}`,
    paymentType: record.paymentType || "N/A",
    date: moment(record.createdAt).format("DD MMM, YYYY"),
    avatarUrl: `https://i.pravatar.cc/50?img=${index + 1}`,
    gender: record.gender,
    location: record.location, // Added location field
  }));

  const columns = [
    {
      title: "#Trx ID",
      dataIndex: "trxId",
      key: "trxId",
      sorter: (a, b) => a.trxId - b.trxId,
    },
    {
      title: "User Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    
    {
      title: "Email",
      dataIndex: "email", // Added Email column
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Location",
      dataIndex: "location", // Added Location column
      key: "location",
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: "Join Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => moment(a.date, "DD MMM, YYYY").unix() - moment(b.date, "DD MMM, YYYY").unix(),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <IoEyeSharp
          onClick={() => showModal(record)}
          style={{ fontSize: "18px", cursor: "pointer" }}
        />
      ),
      sorter: false, // Actions column is not sortable
    },
  ];

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <section>
      <div className="bg-white rounded-lg">
        <div className="md:flex justify-between items-center py-5">
          <h1 className="text-2xl font-semibold flex items-center">Earnings</h1>
          <Form layout="inline" className="flex space-x-4">
            <Item name="date">
              <DatePicker
                className="rounded-md border border-[#2C909D]"
                // onChange={(date) => setSelectedDate(date)}
                placeholder="Donation Date"
              />
            </Item>
            <Item name="searchText">
              <Input
                className="rounded-md w-[70%] md:w-full border border-[#2C909D]"
                placeholder="Search"
                // onChange={(e) => setSearchText(e.target.value)}
              />
            </Item>
            <Item>
              <button className="size-8 rounded-full flex justify-center items-center bg-[#2C909D] text-white">
                <IoIosSearch className="size-5" />
              </button>
            </Item>
          </Form>
        </div>
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
            className="shadow-sm"
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 25, position: ["bottomCenter"] }}
            scroll={{ x: "max-content" }}
            responsive={true}
          />
        </ConfigProvider>
      </div>

      {/* Modal */}
      <Modal
        open={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="text-black">
          <div className="p-5">
            <div className="flex  items-center">
              <h1 className="text-center text-2xl font-semibold my-2 ml-2">
              Transaction Details
              </h1>
            </div>
            {selectedRecord && (
              <>
                <div className="flex justify-between py-3 border-b">
                  <p>Transaction ID :</p>
                  <p>{selectedRecord.accountID}</p>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <p>User Name:</p>
                  <p>{selectedRecord.fullName}</p>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <p>Email:</p>
                  <p>{selectedRecord.email}</p>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <p>Address:</p>
                  <p>{selectedRecord.location}</p>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <p>Date:</p>
                  <p>{selectedRecord.date}</p>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <p>Withdraw Amount ::</p>
                  <p>{selectedRecord.paymentType}</p>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <p>A/C number ::</p>
                  <p>{selectedRecord.gender}</p>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <p>Subscription Type:</p>
                  <p>{selectedRecord.paymentType}</p>
                </div>
                <div className="flex justify-between py-3 ">
                  <button className=" bg-[#2C909D] py-2 px-5 w-[49%] rounded-md">Approve</button>
                  <button className="border border-[#2C909D] py-2 px-5 w-[49%] rounded-md">Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Earnings;
