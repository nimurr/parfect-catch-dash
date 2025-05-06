/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  ConfigProvider,
  Table,
  Form,
} from "antd";
import moment from "moment";
import { useGetAllSubscriptionQuery } from "../../../redux/features/subdcription/subscription";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

const { Item } = Form;

const Subscription = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isFetching, isError, error } = useGetAllSubscriptionQuery();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    if (isError || !data?.data?.attributes?.results) {
      setSubscriptions([]);
    } else {
      const results = data.data.attributes.results;

      const mapped = results.map((sub, index) => ({
        key: sub.id,
        si: index + 1,
        title: sub.title,
        amount: sub.amount,
        days: sub.days,
        limitation: sub.limitation,
        createdAt: sub.createdAt,
        createdBy: sub.createdBy,
        stripePriceId: sub.stripePriceId,
        features: sub.features,
      }));

      setSubscriptions(mapped);
    }
  }, [data, isError, error]);

  const filteredData = subscriptions.filter((entry) =>
    entry.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount ($)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Duration (days)",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Limitation",
      dataIndex: "limitation",
      key: "limitation",
      render: (text) => text || "N/A",
    },
    {
      title: "Stripe Price ID",
      dataIndex: "stripePriceId",
      key: "stripePriceId",
    },
    {
      title: "Subscribed At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (date ? moment(date).format("DD MMM YYYY") : "N/A"),
    },
  ];

  return (
    <section>
      <div className="md:flex justify-between items-center py-6 mb-4">
        <h1 className="text-2xl font-semibold">Subscriptions Buying User List</h1>
        <Form layout="inline" className="flex space-x-4">
          <Item>
            <input
              type="text"
              placeholder="Search by name"
              className="rounded-md px-3 py-2 border border-[#2C909D]"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Item>
          <Item>
            <Link to="/SubscriptionCard">
              <button className="rounded-md px-5 py-2 text-white flex items-center gap-1 bg-[#2C909D]">
                {/* <IoAdd className="text-xl" /> */}
                Subscription
              </button>
            </Link>
          </Item>
        </Form>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#2C909D",
              headerColor: "#000",
              headerBorderRadius: 5,
            },
          },
        }}
      >
        <Table
          loading={isFetching}
          pagination={{
            pageSize: 25,
            position: ["bottomCenter"],
            current: currentPage,
            onChange: setCurrentPage,
          }}
          scroll={{ x: "max-content" }}
          responsive
          columns={columns}
          dataSource={filteredData}
          rowKey="key"
        />
      </ConfigProvider>
    </section>
  );
};

export default Subscription;
