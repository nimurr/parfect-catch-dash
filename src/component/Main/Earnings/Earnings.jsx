import { useState } from "react";
import { Table, Modal, Input, DatePicker, ConfigProvider, Form } from "antd";
import { IoIosSearch } from "react-icons/io";
import moment from "moment";
import { IoEyeSharp } from "react-icons/io5";
import { useGetEarningsQuery } from "../../../redux/features/dashboard/dashboardApi";

const { Item } = Form;

const Earnings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const { data } = useGetEarningsQuery();
  const mockData = data?.data?.attributes?.data || [];

  // Map backend data for Ant Design Table
  const dataSource = mockData.map((record, index) => ({
    key: index + 1,
    trxId: record.id,
    amount: `$${record.amount}`,
    mode: record.mode,
    status: record.status,
    date: moment(record.createdAt).format("DD MMM, YYYY"),
    checkoutSessionId: record.checkoutSessionId,
    stripeSubId: record.stripeSubId,
    stripePriceId: record.stripePriceId,
    limitation: record.subscriptionLimitation,
  }));

  const columns = [
    {
      title: "#Trx ID",
      dataIndex: "trxId",
      key: "trxId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) =>
        moment(a.date, "DD MMM, YYYY").unix() -
        moment(b.date, "DD MMM, YYYY").unix(),
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
                placeholder="Donation Date"
              />
            </Item>
            <Item name="searchText">
              <Input
                className="rounded-md w-[70%] md:w-full border border-[#2C909D]"
                placeholder="Search"
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
            responsive
          />
        </ConfigProvider>
      </div>

      {/* Modal Details */}
      <Modal
        open={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="text-black">
          <div className="p-5">
            <h1 className="text-2xl font-semibold mb-4 text-center">Transaction Details</h1>
            {selectedRecord && (
              <>
                <div className="flex justify-between py-2 border-b">
                  <p>Transaction ID:</p>
                  <p>{selectedRecord.trxId}</p>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <p>Amount:</p>
                  <p>{selectedRecord.amount}</p>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <p>Mode:</p>
                  <p>{selectedRecord.mode}</p>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <p>Status:</p>
                  <p>{selectedRecord.status}</p>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <p>Date:</p>
                  <p>{selectedRecord.date}</p>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <p>Limitation:</p>
                  <p>{selectedRecord.limitation}</p>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <p>Stripe Sub ID:</p>
                  <p>{selectedRecord.stripeSubId}</p>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <p>Stripe Price ID:</p>
                  <p>{selectedRecord.stripePriceId}</p>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <p>Checkout Session:</p>
                  <p className="break-words max-w-[60%]">
                    {selectedRecord.checkoutSessionId}
                  </p>
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
