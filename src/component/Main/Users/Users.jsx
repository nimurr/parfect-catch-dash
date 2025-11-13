


// import { useEffect, useState } from "react";
// import {
//   ConfigProvider,
//   Modal,
//   Table,
//   Form,
//   Input,
//   DatePicker,
// } from "antd";
// import moment from "moment";
// import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";
// import { IoIosSearch, IoMdInformationCircleOutline } from "react-icons/io";
// import { Link } from "react-router-dom";
// import imageApi from "../../../redux/baseApi/imageApi";



// const { Item } = Form;

// const Users = () => {

//   console.log(imageApi)

//   const [searchText, setSearchText] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalViewOpen, setIsModalViewOpen] = useState(false);
//   const [allUser, setAllUser] = useState([]);
//   const [user, setUser] = useState(null);

//   const { data, isFetching, isError, error } = useGetAllUsersQuery();

//   const handleView = (record) => {
//     setUser(record);
//     setIsModalViewOpen(true);
//   };

//   // Apply filtering based on searchText and selectedDate
//   const filteredUsers = allUser.filter((user) => {
//     const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.toLowerCase();
//     const searchMatch = fullName.includes(searchText.toLowerCase());
//     const dateMatch = selectedDate
//       ? moment(user.createdAt).isSame(selectedDate, "day")
//       : true;
//     return searchMatch && dateMatch;
//   });

//   // Build data source for table
//   const dataSource = filteredUsers.map((user, index) => ({
//     id: user.id,
//     si: index + 1,
//     firstName: user?.firstName,
//     lastName: user?.lastName,
//     accountID: user?.accountID,
//     email: user?.email,
//     phone: user?.phone,
//     address_line1: user?.address_line1,
//     createdAt: user?.createdAt,
//     imageUrl: user?.image?.url,
//     status: user?.status,
//     block: user?.block,
//   }));

//   const columns = [
//     {
//       title: "#SI",
//       dataIndex: "si",
//       key: "si",
//       sorter: (a, b) => a.si - b.si,
//     },
//     {
//       title: "User Name",
//       dataIndex: "firstName",
//       key: "firstName",
//       sorter: (a, b) => a.firstName?.localeCompare(b.firstName),
//       render: (text, record) => (
//         <div className="flex items-center space-x-4">
//           {/* User Image */}

//           <img
//             src={imageApi.profileImage || "https://api.perfectcatchdating.com/uploads/users/user.png"}  // Fallback to provided URL
//             alt="user-avatar"
//             className="w-8 h-8 rounded-full"  // Adjust size here
//           />
//           {user?.fullName}
//           {/* User Name */}
//           <span>{text || "N/A"}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//       sorter: (a, b) => a.email?.localeCompare(b.email),
//       render: (text) => text || "N/A",
//     },
//     {
//       title: "Phone Number",
//       dataIndex: "phone",
//       key: "phone",
//       sorter: (a, b) => a.phone?.localeCompare(b.phone),
//       render: (text) => text || "N/A",
//     },
//     {
//       title: "Joined Date",
//       dataIndex: "createdAt",
//       key: "createdAt",
//       sorter: (a, b) =>
//         moment(a.createdAt).unix() - moment(b.createdAt).unix(),
//       render: (date) =>
//         date ? moment(date).format("DD MMM YYYY") : "N/A",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <div className="flex items-center space-x-4">

//             <IoMdInformationCircleOutline
//               size={22}
//               onClick={() => handleView(record)}
//             />

//         </div>
//       ),
//     },
//   ];

//   useEffect(() => {
//     if (isError && error) {
//       setAllUser([]);
//     } else if (data) {
//       const users = data?.data?.attributes?.results || [];
//       setAllUser(users);
//     }
//   }, [data, isError, error]);

//   // Reset to first page when search filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchText, selectedDate]);

//   return (
//     <section>
//       <div className="md:flex justify-between items-center py-6 mb-4">
//         <h1 className="text-2xl flex items-center font-semibold">All Users</h1>
//         <Form layout="inline" className="flex space-x-4">
//           <Item name="date">
//             <DatePicker
//               className="rounded-md border border-[#2C909D]"
//               onChange={(date) => setSelectedDate(date)}
//               placeholder="Select Date"
//             />
//           </Item>
//           <Item name="username">
//             <Input
//               className="rounded-md w-[70%] md:w-full border border-[#2C909D]"
//               placeholder="User Name"
//               onChange={(e) => setSearchText(e.target.value)}
//               allowClear
//             />
//           </Item>
//           <Item>
//             <button
//               type="button"
//               className="size-8 rounded-full flex justify-center items-center bg-[#2C909D]"
//             >
//               <IoIosSearch className="size-5 text-white" />
//             </button>
//           </Item>
//         </Form>
//       </div>
//       <ConfigProvider
//         theme={{
//           components: {
//             Table: {
//               headerBg: "#2C909D",
//               headerColor: "#000",
//               headerBorderRadius: 5,
//             },
//           },
//         }}
//       >
//         <Table
//           loading={isFetching}
//           pagination={{
//             pageSize: 25,
//             position: ["bottomCenter"],
//             current: currentPage,
//             onChange: setCurrentPage,
//           }}
//           scroll={{ x: "max-content" }}
//           responsive
//           columns={columns}
//           dataSource={dataSource}
//           rowKey="id"
//         />
//       </ConfigProvider>
//     </section>
//   );
// };

// export default Users;






import { useEffect, useState } from "react";
import {
  ConfigProvider,
  Table,
  Form,
  Input,
  DatePicker,
} from "antd";
import moment from "moment";
import { IoIosSearch, IoMdArrowRoundBack, IoMdInformationCircleOutline } from "react-icons/io";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";
import imageApi from "../../../redux/baseApi/imageApi";

const { Item } = Form;

const Users = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // State to toggle between table and user details

  const { data, isFetching, isError, error } = useGetAllUsersQuery();

  const handleView = (record) => {
    setUser(record);
    setShowDetails(true); // Show user details when clicked
  };

  const handleBack = () => {
    setShowDetails(false); // Go back to the full table
  };

  // Apply filtering based on searchText and selectedDate
  const filteredUsers = data?.data?.attributes?.results.filter((user) => {
    const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.toLowerCase();
    const searchMatch = fullName.includes(searchText.toLowerCase());
    const dateMatch = selectedDate
      ? moment(user.createdAt).isSame(selectedDate, "day")
      : true;
    return searchMatch && dateMatch;
  }) || [];

  const dataSource = filteredUsers.map((user, index) => ({
    id: user.id,
    si: index + 1,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
    imageUrl: user.image?.url,
  }));

  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      sorter: (a, b) => a.si - b.si,
    },
    {
      title: "User Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text, record) => (
        <div className="flex items-center space-x-4">
          <img
            src={record.imageUrl || "https://api.perfectcatchdating.com/uploads/users/user.png"}
            alt="user-avatar"
            className="w-8 h-8 rounded-full"
          />
          <span>{text || "N/A"}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text || "N/A",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      render: (text) => text || "N/A",
    },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (date ? moment(date).format("DD MMM YYYY") : "N/A"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-4">
          <IoMdInformationCircleOutline
            size={22}
            onClick={() => handleView(record)} // Show user details when clicked
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (isError && error) {
      console.error(error);
    } else if (data) {
      const users = data?.data?.attributes?.results || [];
      setUser(users);
    }
  }, [data, isError, error]);

  // Reset to first page when search filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, selectedDate]);

  return (
    <section className="flex">
      {/* Left side: User list */}
      {!showDetails && (
        <div className="w-full md:w-full p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl flex items-center font-semibold">All Users</h1>
            <Form layout="inline" className="flex items-center gap-2 mb-4">
              <Item name="date">
                <DatePicker
                  className="rounded-md border border-[#2C909D]"
                  onChange={(date) => setSelectedDate(date)}
                  placeholder="Select Date"
                />
              </Item>
              <div className="flex items-center gap-2">
                <Item name="username">
                  <Input
                    className="rounded-md md:w-full border border-[#2C909D]"
                    placeholder="User Name"
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                  />
                </Item>
                <Item>
                  <button
                    type="button"
                    className="size-8 rounded-full flex justify-center items-center bg-[#2C909D]"
                  >
                    <IoIosSearch className="size-5 text-white" />
                  </button>
                </Item>
              </div>
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
              dataSource={dataSource}
              rowKey="id"
            />
          </ConfigProvider>
        </div>
      )}

      {/* Right side: User details */}
      {showDetails && user && (
        <div className="md:flex justify-center items-center">
          <div className="w-full md:w-full md:p-6 p-3">
            <div className="flex items-center justify-between flex-wrap">
              <h1 className="text-2xl flex items-center font-semibold">All Users</h1>
              <Form layout="inline" className="flex gap-3 mb-4">
                <Item name="date">
                  <DatePicker
                    className="rounded-md border border-[#2C909D]"
                    onChange={(date) => setSelectedDate(date)}
                    placeholder="Select Date"
                  />
                </Item>
                <div className="flex items-center ">
                  <Item name="username">
                    <Input
                      className="rounded-md  md:w-full border border-[#2C909D]"
                      placeholder="User Name"
                      onChange={(e) => setSearchText(e.target.value)}
                      allowClear
                    />
                  </Item>
                  <Item>
                    <button
                      type="button"
                      className="size-8 rounded-full flex justify-center items-center bg-[#2C909D]"
                    >
                      <IoIosSearch className="size-5 text-white" />
                    </button>
                  </Item>
                </div>
              </Form>
            </div>
            <div className="w-[85vw] md:w-full mx-auto overscroll-x-auto">
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
                  dataSource={dataSource}
                  rowKey="id"
                />
              </ConfigProvider>
            </div>
          </div>
          <div className="w-full md:w-[800px] h-[400px]  border p-4 rounded-lg">

            <button onClick={handleBack} className="text-blue-500 mb-4"><IoMdArrowRoundBack /></button>
            <img
              src={user?.imageUrl || "https://api.perfectcatchdating.com/uploads/users/user.png"}
              alt="user-avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold text-center">{user?.firstName} {user?.lastName}</h2>
            <div className="mt-4">
              <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
              <p><strong>Email:</strong> {user?.email || "N/A"}</p>
              <p><strong>Phone number:</strong> {user?.phone || "N/A"}</p>
              <p><strong>Joining date:</strong> {user?.createdAt ? moment(user.createdAt).format("DD MMM YYYY") : "N/A"}</p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Users;
