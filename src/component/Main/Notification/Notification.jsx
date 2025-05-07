


import { Image, Pagination } from "antd";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGetNitificationQuery, useReadNotificaitonMutation } from "../../../redux/features/notification/notification";
import moment from "moment";
import notificaiton from '../../../assets/categoriestree/noti.avif'

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, refetch } = useGetNitificationQuery();
  const notificaitonData = data?.data?.attributes?.notifications;

  const pageSize = 25;

  // Pagination Logic
  const paginatedNotifications = notificaitonData?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const [readNotificaiton] = useReadNotificaitonMutation();

  const handleReadNotificaiton = async (id) => {
    const notiData = {
      notificationId: id
    }

    try {
      const res = await readNotificaiton(notiData).unwrap();
      console.log(res);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl flex items-center mb-4"><Link to='/'><IoChevronBack className="text-2xl" /> </Link>Notification</h1>

      {/* Check if notifications exist */}
      <div className="space-y-4">
        {paginatedNotifications && paginatedNotifications.length > 0 ? (
          paginatedNotifications.map((item) => (
            <div onClick={() => handleReadNotificaiton(item?.id)} key={item.id} className={`border border-[#309EAD] rounded-md p-4 flex items-center space-x-4 cursor-pointer ${item?.status === 'unread' ? "bg-[#309ead34]" : ""}`}>
              
              {/* Notification Icon */}
              <div className="text-[#309EAD] border border-[#309EAD] rounded-full p-2">
                <span className="text-[#309EAD] bg-[#309EAD] p-1.5 rounded-full absolute ml-4"></span>
                <IoMdNotificationsOutline size={30} className="relative" />
              </div>

              {/* Notification Content */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                  {/* Add image here if available */}
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="Notification" className="w-12 h-12 object-cover rounded-full" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <IoMdNotificationsOutline size={24} className="text-white" />
                    </div>
                  )}
                  
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-gray-500">{moment(item.createdAt).format("DD MMM, YYYY - hh:mm A")}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          // If there are no notifications
          <div className=" rounded-md p-4 text-center">
            
            <Image src={notificaiton} className="border border-gray-300"/>
          </div>
        )}
      </div>

      {/* Centering the Pagination */}
      {paginatedNotifications && paginatedNotifications.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={notificaitonData?.length}
            pageSize={pageSize}
            onChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Notification;
